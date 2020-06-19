import "./WorkbenchGrid.css";
import React from "react";
import { PDFMaterialContainer } from "../elements/materials/PDF/PDF";
import Grid from "@material-ui/core/Grid";
import { NoteContainer } from "../elements/note/Note";
import { QACardContainer } from "../elements/cards/QACard";
import { BlanksCardContainer } from "../elements/cards/BlanksCard";
import { WorkbenchSlot } from "./slot/WorkbenchSlot";

const WorkbenchRow = ({ children, rowsPerBench = 2 }: any) => {
	//default is 2 rows per Bench, (2x2 grid)
	const height = 100 / rowsPerBench + "%";

	return (
		<Grid
			item
			container
			spacing={2}
			direction="row"
			justify="space-evenly"
			alignItems="stretch"
			style={{ height, width: "100%" }}
		>
			{children}
		</Grid>
	);
};

type GridMaterialType = "PDF";

function gridMaterialToJSX(girdMaterial: GridMaterialType) {
	switch (girdMaterial) {
		case "PDF":
			return (
				<Grid item className="Element">
					<PDFMaterialContainer></PDFMaterialContainer>
				</Grid>
			);
	}
}

export type GridElementType = "Note" | "QA-Card" | "Blanks-Card";

export type GridElementSetup = { elementType: GridElementType; id: number };

function gridElementToJSX(gridElement: GridElementSetup) {
	switch (gridElement.elementType) {
		case "Note":
			return (
				<Grid item className="Element">
					<NoteContainer></NoteContainer>
				</Grid>
			);
		case "QA-Card":
			return (
				<Grid item className="Element">
					<QACardContainer></QACardContainer>
				</Grid>
			);
		case "Blanks-Card":
			return (
				<Grid item className="Element">
					<BlanksCardContainer></BlanksCardContainer>
				</Grid>
			);
	}
}

type GridSlotType = "Material" | "Elements";

export type GridSlotSetup = { slotType: GridSlotType; slotContent: GridElementSetup[] | GridMaterialType };

function gridSlotToJSX(gridSlot: GridSlotSetup) {
	// need actual representation of type for persistence, otherwise could use TypeScript types
	switch (gridSlot.slotType) {
		case "Material":
			return [gridMaterialToJSX(gridSlot.slotContent as GridMaterialType)];
		case "Elements":
			return (gridSlot.slotContent as GridElementSetup[]).map((gridElement) => gridElementToJSX(gridElement));
	}
}

export type GridSetup = {
	nextID: number;
	slot1: GridSlotSetup;
	slot2: GridSlotSetup;
	slot3: GridSlotSetup;
	slot4: GridSlotSetup;
};

export function WorkbenchGrid({ workbenchGrid }: { workbenchGrid: GridSetup }) {
	return (
		<Grid container className="Workbench" style={{ height: "100vh" }} justify="space-evenly" alignItems="stretch">
			<WorkbenchRow>
				<WorkbenchSlot>{gridSlotToJSX(workbenchGrid.slot1)}</WorkbenchSlot>
				<WorkbenchSlot>{gridSlotToJSX(workbenchGrid.slot2)}</WorkbenchSlot>
			</WorkbenchRow>

			<WorkbenchRow>
				<WorkbenchSlot>{gridSlotToJSX(workbenchGrid.slot3)}</WorkbenchSlot>
				<WorkbenchSlot>{gridSlotToJSX(workbenchGrid.slot4)}</WorkbenchSlot>
			</WorkbenchRow>
		</Grid>
	);
}
