import React from "react";
import { Button, FormControlLabel } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";
import { getPDFShowStatus } from "../selectors";
import { actions } from "../slice";

export const ShowMaterialCheckbox = () => {
	const dispatch = useDispatch();
	const pdfShowState = useSelector(getPDFShowStatus);

	return (
		<Button
			startIcon={
				<FormControlLabel
					label="Material"
					control={<GreenCheckbox checked={pdfShowState === "SHOW"} />}
				></FormControlLabel>
			}
			variant="contained"
			color="primary"
			onClick={() => {
				dispatch(actions.pdfShowStatus(pdfShowState === "SHOW" ? "HIDE" : "SHOW"));
			}}
		></Button>
	);
};
