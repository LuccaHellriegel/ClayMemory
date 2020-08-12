import display from "../../display";
import river from "../../river";
import React from "react";
import { AppBar, Toolbar, Grid, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";

export const ControlBar = () => {
	const totalPages = useSelector(display.selectors.getTotalPages);
	//TODO-RC: show active River ID or higlight it in some way? with the mouse-enter pattern this could lead to weird edge cases otherwise
	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Grid></Grid>
				<river.components.ShowRiverButton></river.components.ShowRiverButton>
				<display.components.ShowMaterialButton></display.components.ShowMaterialButton>
				<Divider orientation="vertical" flexItem />
				{totalPages && <display.components.PageChooser></display.components.PageChooser>}
				{totalPages && <display.components.PreviousButton></display.components.PreviousButton>}
				{totalPages && <display.components.NextButton></display.components.NextButton>}
			</Toolbar>
		</AppBar>
	);
};
