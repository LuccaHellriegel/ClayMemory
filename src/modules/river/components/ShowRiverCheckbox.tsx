import React from "react";
import { Button, FormControlLabel } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";
import { getRiverShowState } from "../selectors";
import { actions } from "../slice";

export const ShowRiverCheckbox = () => {
	const dispatch = useDispatch();
	const curRiverShowState = useSelector(getRiverShowState);

	return (
		<Button
			startIcon={
				<FormControlLabel
					label="River"
					control={<GreenCheckbox checked={curRiverShowState === "SHOW"} />}
				></FormControlLabel>
			}
			variant="contained"
			color="primary"
			onClick={() => {
				dispatch(actions.riverShowState(curRiverShowState === "SHOW" ? "HIDE" : "SHOW"));
			}}
		></Button>
	);
};
