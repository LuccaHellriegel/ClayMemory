import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NestedMenuItem from "material-ui-nested-menu-item";
import {
	GridSetup,
	GridSlotSetup,
	GridElementSetup,
	GridElementType,
} from "../../../scenes/workbench/workbench-grid/WorkbenchGrid";

// TODO: to goal or to new one!
function goalMenu(slotElements: GridElementSetup[], goal: GridElementType) {
	return [<MenuItem>{"New: " + goal}</MenuItem>].concat(
		slotElements
			.filter((element) => element.elementType === goal)
			.map((element: GridElementSetup) => <MenuItem>{element.id + ": " + element.elementType}</MenuItem>)
	);
}

function typeMenu(slotElements: GridElementSetup[], open: boolean) {
	const noteItem = (
		<NestedMenuItem label="Note" parentMenuOpen={open}>
			{goalMenu(slotElements, "Note")}
		</NestedMenuItem>
	);

	const qaItem = (
		<NestedMenuItem label="QA-Card" parentMenuOpen={open}>
			{goalMenu(slotElements, "QA-Card")}
		</NestedMenuItem>
	);

	const blanksItem = (
		<NestedMenuItem label="Blanks-Card" parentMenuOpen={open}>
			{goalMenu(slotElements, "Blanks-Card")}
		</NestedMenuItem>
	);

	return [noteItem, qaItem, blanksItem];
}

export function ExtractionMenu({
	mouseX,
	mouseY,
	close,
	workbenchGrid,
}: {
	mouseX: number;
	mouseY: number;
	close: any;
	workbenchGrid: GridSetup;
}) {
	//TODO: context menu only for editor content not anywhere?
	// yes, because otherwise user can try to extract non-material

	//TODO: maybe pre-calculate this on changing layout?
	// assumes slotX as property
	const slotElements = Object.entries(workbenchGrid)
		.filter((entry) => (entry[0] as string).indexOf("slot") !== -1)
		.filter((entry) => (entry[1] as GridSlotSetup).slotType === "Elements")
		.map((entry) => (entry[1] as GridSlotSetup).slotContent)
		.flat()
		.sort((a, b) => (a as GridElementSetup).id - (b as GridElementSetup).id);

	const open = mouseY !== null;

	// it is necessary to close on right-click, because menu renders invisible diff that makes selection impossible
	// Source: https://stackoverflow.com/questions/61456322/how-do-you-close-the-material-ui-context-menu-without-displaying-the-default-co
	return (
		<div
			onContextMenu={(event) => {
				event.preventDefault();
				close();
			}}
		>
			<Menu
				keepMounted
				open={open}
				onClose={close}
				anchorReference="anchorPosition"
				anchorPosition={mouseY !== null && mouseX !== null ? { top: mouseY, left: mouseX } : undefined}
			>
				<NestedMenuItem label="Word" parentMenuOpen={open}>
					{typeMenu(slotElements as GridElementSetup[], open)}
				</NestedMenuItem>
				<NestedMenuItem label="Sentence" parentMenuOpen={open}>
					{typeMenu(slotElements as GridElementSetup[], open)}
				</NestedMenuItem>
				<NestedMenuItem label="Section" parentMenuOpen={open}>
					{typeMenu(slotElements as GridElementSetup[], open)}
				</NestedMenuItem>
			</Menu>
		</div>
	);
}
