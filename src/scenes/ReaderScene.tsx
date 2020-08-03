import React from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import select from "../modules/select";
import display from "../modules/display";
import navigate from "../modules/navigate";
import control from "../modules/control";
import river from "../modules/river";
import creation from "../modules/creation";
import { Divider } from "@material-ui/core";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
				width: "38%",
				height: "100%",
			}}
		>
			<Paper elevation={3}>{children}</Paper>
		</Grid>
	);
}

function ReaderSceneMaterialColumn({ size }: any) {
	return (
		<Grid
			item
			style={{
				width: "60%",
			}}
		>
			<Paper elevation={3}>
				<navigate.components.PageControlBarContainer></navigate.components.PageControlBarContainer>
				<Divider></Divider>
				<select.components.DocumentCanvasContainer parentSize={size}></select.components.DocumentCanvasContainer>
				<display.components.PDFDocumentContainer parentSize={size}></display.components.PDFDocumentContainer>
				<display.components.PDFUploadContainer></display.components.PDFUploadContainer>
			</Paper>
		</Grid>
	);
}

const ReaderSceneMaterialColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	ReaderSceneMaterialColumn
);

export function ReaderScene() {
	return (
		<div>
			<control.components.ControlContainer></control.components.ControlContainer>
			<Grid container justify="space-around" direction="row" alignItems="stretch">
				<ReaderSceneGridColumn>
					<river.components.CardRiverContainer id={river.constants.RiverMakeUpID}></river.components.CardRiverContainer>
				</ReaderSceneGridColumn>
				<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
			</Grid>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
		</div>
	);
}
