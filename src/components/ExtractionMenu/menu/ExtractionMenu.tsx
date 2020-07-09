import React from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { clickMenu } from "./ExtractionMenuActionsReducers";
import { connect } from "react-redux";

// TODO: component that takes existing/open cards and creates menu with NestedMenuItem
// need Types of extraction and possible Targets/Goals

function ExtractionMenu({ mouseX, mouseY, close }: { mouseX: number; mouseY: number; close: any }) {
	//TODO: context menu only for editor content not anywhere?
	// yes, because otherwise user can try to extract non-material

	//TODO: maybe pre-calculate this on changing layout?
	// assumes slotX as property

	// TODO: use existing/open cards as possible targets
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
				<NestedMenuItem label="Word" parentMenuOpen={open}></NestedMenuItem>
				<NestedMenuItem label="Sentence" parentMenuOpen={open}></NestedMenuItem>
				<NestedMenuItem label="Section" parentMenuOpen={open}></NestedMenuItem>
			</Menu>
		</div>
	);
}

function mapStateToProps({ mouseX, mouseY, workbenchGrid }: any) {
	return { mouseX, mouseY, workbenchGrid };
}

export const ExtractionMenuContainer = connect(mapStateToProps, {
	clickMenu: () => {
		return clickMenu({ mouseX: null, mouseY: null, selection: null });
	},
})(ExtractionMenu);
