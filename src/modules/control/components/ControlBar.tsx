import display from "../../display";
import focus from "../../focus";
import React, { ChangeEvent } from "react";
import { AppBar, Toolbar, Divider, Tabs, Tab, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ShowRiverButton } from "./ShowRiverButton";
import { Options } from "./Options";

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

	const totalPages = useSelector(display.selectors.getTotalPages);
	return (
		<Grid
			item
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("CONTROL"));
			}}
		>
			<AppBar>
				<Toolbar variant="dense">
					<Tabs value={value} onChange={handleChange}>
						<Tab label="ActiveRiver" />
						<Tab label="SummaryRiver" />
					</Tabs>
					<Divider orientation="vertical" flexItem />
					{totalPages && <display.components.PageChooser></display.components.PageChooser>}
					{totalPages && <display.components.PreviousButton></display.components.PreviousButton>}
					{totalPages && <display.components.NextButton></display.components.NextButton>}
					<Divider orientation="vertical" flexItem />
					{value === 0 && <ShowRiverButton></ShowRiverButton>}
					{value === 0 && <display.components.ShowMaterialButton></display.components.ShowMaterialButton>}
					{value === 0 && <Divider orientation="vertical" flexItem />}
					<Options></Options>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};
