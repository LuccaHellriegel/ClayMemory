import React, { useState, ChangeEvent } from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import display from "../modules/display";
import control from "../modules/control";
import river from "../modules/river";
import creation from "../modules/creation";
import focus from "../modules/focus";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

//TODO-RC: make it possible to either show Active River / (Material/ SummaryRiver) or SummaryRiver / Material
//TODO-RC: in SummaryRiver make Buttons to jump to page of the rivers
//TODO-RC: on top of SummaryRiver make field for navigating the river (jumping to sub-river, maybe also in sub-river for jumping around?)
//TODO-RC: think about the idea, that each column has a app-menu that has a dropwdown, where all the possible things are that it can display (so I cant prevent this akward having two SummaryRivers available)
//TODO-RC: buttons for making new cards in River
//TODO-RC: make way for me to upload and download cards so I can prepare the user-study

//TODO-NICE: make River-View, where you can just see one card and can make it smaller? Maybe just button to zoom "in" / just seeing the current river
//TODO-NICE: mark Origin-Span or maybe rect over whole page-section?
//TODO-NICE: make reconciliation algorithm for origin when new PDF versions come out

const ReaderSceneRiverColumn = ({ hidden }: any) => {
	//TODO-RC: use other buttons for hide/showing columns, that indicate just columns and not content
	return (
		<Grid
			item
			style={{
				width: "38%",
			}}
			hidden={hidden}
		>
			<river.components.ActiveCardRiver></river.components.ActiveCardRiver>
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
				<display.components.PDFDocumentContainer parentSize={size}></display.components.PDFDocumentContainer>
				<display.components.PDFUploadContainer></display.components.PDFUploadContainer>
			</Paper>
		</Grid>
	);
}

const ReaderSceneMaterialColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	ReaderSceneMaterialColumn
);

//TODO: make show/hide depdendant on tab, also Page choice, control-bar dependant on tab

export function ReaderScene() {
	const dispatch = useDispatch();

	const displayFocus = useSelector(focus.selectors.getDisplayFocus);
	const value = displayFocus === "ACTIVE_RIVER" ? 0 : 1;

	const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
		dispatch(
			newValue === 0
				? focus.actions.updateDisplayFocus("ACTIVE_RIVER")
				: focus.actions.updateDisplayFocus("SUMMARY_RIVER")
		);
	};

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
					<AppBar position="static">
						<Tabs value={value} onChange={handleChange}>
							<Tab label="ActiveRiver" />
							<Tab label="SummaryRiver" />
						</Tabs>
					</AppBar>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>

				<Grid item hidden={value !== 0}>
					<Grid container justify="space-around" direction="row" alignItems="stretch">
						<ReaderSceneRiverColumn hidden={!showRiver}></ReaderSceneRiverColumn>
						<ReaderSceneMaterialColumnWithSize hidden={!showMaterial}></ReaderSceneMaterialColumnWithSize>
					</Grid>
				</Grid>
				<Grid item hidden={value !== 1}>
					<river.components.SummaryRiver></river.components.SummaryRiver>
				</Grid>
			</Grid>
			<creation.components.SourceMenuContainer></creation.components.SourceMenuContainer>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
		</div>
	);
}
