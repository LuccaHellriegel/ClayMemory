import React from "react";
import { Button, FormControlLabel } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";
import { getDisplayStatus } from "../selectors";
import { actions } from "../slice";

export const ShowMaterialCheckbox = () => {
	const dispatch = useDispatch();
	const displayShowState = useSelector(getDisplayStatus);

	return (
		<Button
			startIcon={
				<FormControlLabel
					label="Material"
					control={<GreenCheckbox checked={displayShowState === "SHOW"} />}
				></FormControlLabel>
			}
			variant="contained"
			color="primary"
			onClick={() => {
				dispatch(actions.displayStatus(displayShowState === "SHOW" ? "HIDE" : "SHOW"));
			}}
		></Button>
	);
};
