import display from "../../display";
import river from "../../river";
import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import select from "../../select";

export const ControlBar = () => {
	const totalPages = useSelector(display.selectors.getTotalPages);

	return (
		<AppBar position="static">
			<Toolbar variant="dense">
				<river.components.ShowRiverButton></river.components.ShowRiverButton>
				{totalPages && <display.components.PageChooser></display.components.PageChooser>}
				{totalPages && <display.components.PreviousButton></display.components.PreviousButton>}
				{totalPages && <display.components.NextButton></display.components.NextButton>}
				{totalPages && <display.components.ShowMaterialButton></display.components.ShowMaterialButton>}
				{totalPages && <select.components.SelectionTypeButton></select.components.SelectionTypeButton>}
			</Toolbar>
		</AppBar>
	);
};
