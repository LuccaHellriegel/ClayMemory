import { FormGroup, FormControlLabel, withStyles, CheckboxProps, Checkbox } from "@material-ui/core";
import React from "react";
import { green } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { getRiverContentState } from "../selectors";
import { RiverContentState } from "../model";
import { setRiverContentState } from "../actions";

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600],
		},
	},
	checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const RiverContentFormGroup = () => {
	const riverContentState = useSelector(getRiverContentState);
	const dispatch = useDispatch();

	const showQAs = riverContentState === "ALL" || riverContentState === "QAS";
	const showNotes = riverContentState === "ALL" || riverContentState === "NOTES";

	const changeContentState = (clickedState: RiverContentState) => {
		// deactivating changes to the other state
		// reactivating leads to all-state, we dont allow do show nothing

		const wantsToDeactiveNotesWithDeactivatedQAs = !showQAs && showNotes && clickedState === "NOTES";
		const wantsToDeactiveQAsWithDeactivatedNotes = !showNotes && showQAs && clickedState === "QAS";

		if (wantsToDeactiveNotesWithDeactivatedQAs || wantsToDeactiveQAsWithDeactivatedNotes) {
			return;
		}

		if (!showQAs && clickedState === "QAS") {
			dispatch(setRiverContentState("ALL"));
			return;
		}

		if (!showNotes && clickedState === "NOTES") {
			dispatch(setRiverContentState("ALL"));
			return;
		}

		if (showQAs && clickedState === "QAS") {
			dispatch(setRiverContentState("NOTES"));
			return;
		}

		if (showNotes && clickedState === "NOTES") {
			dispatch(setRiverContentState("QAS"));
			return;
		}
	};

	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<GreenCheckbox
						checked={showQAs}
						onClick={() => {
							changeContentState("QAS");
						}}
					/>
				}
				label="Show QAs"
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
				label="Show Notes"
			/>
		</FormGroup>
	);
};
