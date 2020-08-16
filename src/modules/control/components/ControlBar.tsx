import display from "../../display";
import river from "../../river";
import focus from "../../focus";
import React, { ChangeEvent } from "react";
import { AppBar, Toolbar, Divider, Tabs, Tab, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ShowRiverButton } from "./ShowRiverButton";

//TODO-RC: make dropdown menu (or drawer?) for switching documents (how to make cross-document stapels?), download csv for Anki / json for loading, loading option
//TODO-RC: save PDF somehow
//TODO-RC: merge tabs with controlbar
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
	//TODO-RC: show active River ID or higlight it in some way? with the mouse-enter pattern this could lead to weird edge cases otherwise
	return (
		<Grid
			item
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("CONTROL"));
			}}
		>
			<AppBar position="static">
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
				</Toolbar>
			</AppBar>
		</Grid>
	);
};
