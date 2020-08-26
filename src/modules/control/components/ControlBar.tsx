import display from "../../display";
import focus from "../../focus";
import React, { ChangeEvent } from "react";
import { AppBar, Toolbar, Divider, Tabs, Tab, Grid, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Options } from "./Options";
import { CardSearchBar } from "./CardSearchBar";
import { UndoButton, RedoButton } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";
//TODO-NICE: download/load csv for Anki
export const ControlBar = () => {
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

	return (
		<Grid
			item
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("CONTROL"));
			}}
		>
			<AppBar>
				<Toolbar variant="regular">
					<div style={{ width: "7%" }}>
						<display.components.PageChooser></display.components.PageChooser>
					</div>
					<display.components.PreviousButton></display.components.PreviousButton>
					<display.components.NextButton></display.components.NextButton>
					<Divider orientation="vertical" flexItem />
					<Tabs value={value} onChange={handleChange}>
						<Tab label="ActiveRiver" />
						<Tab label="SummaryRiver" />
					</Tabs>
					<Divider orientation="vertical" flexItem />
					<UndoButton></UndoButton>
					<RedoButton></RedoButton>
					<Divider orientation="vertical" flexItem />
					<ShowHideButton></ShowHideButton>

					<CardSearchBar></CardSearchBar>
					<Options></Options>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};
