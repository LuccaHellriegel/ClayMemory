import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import select from "../modules/select";
import display from "../modules/display";
import control from "../modules/control";
import river from "../modules/river";
import creation from "../modules/creation";
import focus from "../modules/focus";
import { Divider, AppBar } from "@material-ui/core";
import { useDispatch } from "react-redux";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
				width: "38%",
			}}
		>
			<Paper elevation={3}>{children}</Paper>
		</Grid>
	);
}

function ReaderSceneMaterialColumn({ size }: any) {
	const dispatch = useDispatch();

	const [elevation, setElevation] = useState(3);

	return (
		<Grid
			item
			style={{
				width: "60%",
			}}
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("SELECTION"));
				setElevation(20);
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
		>
			<Paper elevation={elevation}>
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
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<Grid item>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>

				<Grid item>
					<Grid container justify="space-around" direction="row" alignItems="stretch">
						<ReaderSceneGridColumn>
							<river.components.CardRiverContainer
								riverID={river.constants.RiverMakeUpID}
							></river.components.CardRiverContainer>
						</ReaderSceneGridColumn>
						<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
					</Grid>
				</Grid>
			</Grid>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
		</div>
	);
}
