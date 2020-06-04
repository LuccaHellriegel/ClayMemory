import "./Grid.css";
import React from "react";
import { PDFMaterialContainer } from "./elements/materials/PDF/PDF";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { NoteContainer } from "./elements/note/Note";
import { QACardContainer } from "./elements/cards/QACard";
import { BlanksCardContainer } from "./elements/cards/BlanksCard";

const WorkbenchSlot = ({
	children,
	slotsPerRow = 2,
	slotsPerColumn = 1,
}: {
	children: any;
	slotsPerRow?: number;
	slotsPerColumn?: number;
}) => {
	//default is 2 slots per Row, 1 per column (2x2 grid)
	const height = 100 / slotsPerColumn + "%";
	const width = 100 / slotsPerRow + "%";

	return (
		<Grid
			item
			container
			className="WorkbenchSlot"
			style={{ height, width }}
			direction="column"
			justify="flex-start"
			alignItems="stretch"
		>
			{children}
		</Grid>
	);
};

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

function Workbench() {
	return (
		<Grid container className="Workbench" style={{ height: "100vh" }} justify="space-evenly" alignItems="stretch">
			<WorkbenchRow>
				<WorkbenchSlot>
					<Grid item className="Element">
						<NoteContainer></NoteContainer>
					</Grid>
				</WorkbenchSlot>
				<WorkbenchSlot>
					<Grid item className="Element">
						<QACardContainer></QACardContainer>
					</Grid>
				</WorkbenchSlot>
			</WorkbenchRow>

			<WorkbenchRow>
				<WorkbenchSlot>
					<Grid item className="Element">
						<PDFMaterialContainer></PDFMaterialContainer>
					</Grid>
				</WorkbenchSlot>
				<WorkbenchSlot>
					<Grid item className="Element">
						<BlanksCardContainer></BlanksCardContainer>
					</Grid>
				</WorkbenchSlot>
			</WorkbenchRow>
		</Grid>
	);
}

function mapStateToProps(state: any) {
	return {};
}

function mapDispatchToProps(dispatch: any) {
	return {};
}

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Workbench);
