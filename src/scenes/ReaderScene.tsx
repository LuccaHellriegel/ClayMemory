import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import display from "../modules/display";
import control from "../modules/control";
import river from "../modules/river";
import creation from "../modules/creation";
import focus from "../modules/focus";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const ReaderSceneRiverColumn = ({ hidden }: any) => {
	return (
		<Grid
			item
			style={{
				width: "38%",
			}}
			hidden={hidden}
		>
			<Grid container justify="center" direction="row" alignItems="stretch" spacing={1}>
				<Grid item>
					<river.components.SummaryRiver></river.components.SummaryRiver>
				</Grid>
				<Grid item>
					<river.components.ActiveCardRiver></river.components.ActiveCardRiver>
				</Grid>
			</Grid>
		</Grid>
	);
};

function ReaderSceneMaterialColumn({ size, hidden }: any) {
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
			hidden={hidden}
		>
			<Paper elevation={elevation}>
				<Divider></Divider>
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
	const dispatch = useDispatch();

	const showMaterial = useSelector(display.selectors.displayStatusIsShow);
	const showRiver = useSelector(river.selectors.riverShowStateIsShow);
	return (
		<div>
			<control.components.ControlContainer></control.components.ControlContainer>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<Grid
					item
					onMouseEnter={() => {
						dispatch(focus.actions.tryUpdateFocus("CONTROL"));
					}}
				>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>

				<Grid
					item
					onMouseEnter={() => {
						dispatch(focus.actions.tryUpdateFocus("EDITOR"));
					}}
				>
					<Grid container justify="space-around" direction="row" alignItems="stretch">
						<ReaderSceneRiverColumn hidden={!showRiver}></ReaderSceneRiverColumn>
						<ReaderSceneMaterialColumnWithSize hidden={!showMaterial}></ReaderSceneMaterialColumnWithSize>
					</Grid>
				</Grid>
			</Grid>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
		</div>
	);
}
