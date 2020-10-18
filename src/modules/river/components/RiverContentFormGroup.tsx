import { FormGroup, FormControlLabel } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRiverContentState } from "../selectors";
import { RiverContentState } from "../model";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";
import { actions } from "../slice";

export const RiverContentFormGroup = () => {
	const riverContentState = useSelector(getRiverContentState);
	const dispatch = useDispatch();

	const showQAs = riverContentState === "ALL" || riverContentState === "QAS";
	const showNotes = riverContentState === "ALL" || riverContentState === "NOTES";

	const changeContentState = (clickedState: RiverContentState) => {
		if (!showQAs && clickedState === "QAS") {
			if (showNotes) {
				dispatch(actions.riverContentState("ALL"));
			} else {
				dispatch(actions.riverContentState("QAS"));
			}
			return;
		}

		if (!showNotes && clickedState === "NOTES") {
			if (showQAs) {
				dispatch(actions.riverContentState("ALL"));
			} else {
				dispatch(actions.riverContentState("NOTES"));
			}
			return;
		}

		if (showQAs && clickedState === "QAS") {
			if (!showNotes) {
				dispatch(actions.riverContentState("NONE"));
			} else {
				dispatch(actions.riverContentState("NOTES"));
			}
			return;
		}

		if (showNotes && clickedState === "NOTES") {
			if (!showQAs) {
				dispatch(actions.riverContentState("NONE"));
			} else {
				dispatch(actions.riverContentState("QAS"));
			}
			return;
		}
	};

	return (
		<FormGroup>
			<FormControlLabel
				control={
					<GreenCheckbox
						checked={showQAs}
						onClick={() => {
							changeContentState("QAS");
						}}
					/>
				}
				label="QAs"
			/>
			<FormControlLabel
				control={
					<GreenCheckbox
						checked={showNotes}
						onClick={() => {
							changeContentState("NOTES");
						}}
					/>
				}
				label="Notes"
			/>
		</FormGroup>
	);
};
