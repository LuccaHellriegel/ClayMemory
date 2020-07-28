import React from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import modules from "../modules";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
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
				<modules.material.select.components.default.DocumentCanvasContainer
					parentSize={size}
				></modules.material.select.components.default.DocumentCanvasContainer>
				<modules.material.display.components.default.PDFDocumentContainer
					parentSize={size}
				></modules.material.display.components.default.PDFDocumentContainer>
				<modules.material.display.components.default.PDFUploadContainer></modules.material.display.components.default.PDFUploadContainer>
				<modules.material.navigate.components.default.PageControlBarContainer></modules.material.navigate.components.default.PageControlBarContainer>
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
			<modules.control.components.default.ControlContainer></modules.control.components.default.ControlContainer>
			<Grid container justify="space-around" direction="row" alignItems="stretch">
				<ReaderSceneGridColumn>
					<modules.cards.river.components.default.CardRiverContainer
						index={0}
					></modules.cards.river.components.default.CardRiverContainer>
				</ReaderSceneGridColumn>
				<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
				<ReaderSceneGridColumn>
					<modules.cards.river.components.default.CardRiverContainer
						index={1}
					></modules.cards.river.components.default.CardRiverContainer>
				</ReaderSceneGridColumn>
			</Grid>
			<modules.cards.creation.components.default.ContextMenuContainer></modules.cards.creation.components.default.ContextMenuContainer>
		</div>
	);
}
