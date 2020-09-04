import React, { useState } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import selection from "../../../../selection";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export const ClayCardField = ({
	storeValue = "",
	saveChanges,
	setSourceCard,
	style,
	...rest
}: {
	storeValue?: string;
	setSourceCard: () => void;
	saveChanges: (value: string) => void;
	style: any;
} & TextFieldProps) => {
	const [state, setState] = useState({ storeValue, mutableValue: storeValue });
	const dispatch = useDispatch();

	// reset if new storeValue, otherwise keep user-mutated value
	if (state.storeValue !== storeValue) {
		setState({ storeValue, mutableValue: storeValue });
	}

	// need the onChange-pattern, because we want to be able to pre-fill the field from the store
	return (
		<TextField
			InputProps={{ disableUnderline: true, style: { minWidth: "400px" } }}
			multiline
			variant="filled"
			value={state.mutableValue}
			onChange={(event) => {
				const submittedValue = (event.target as HTMLTextAreaElement).value;
				setState({ ...state, mutableValue: submittedValue });
			}}
			onBlur={(event: any) => {
				saveChanges(event.target.value);
			}}
			onMouseUp={() => {
				mouseUpCardField(dispatch, setSourceCard);
			}}
			style={style}
			{...rest}
		></TextField>
	);
};

const mouseUpCardField = (dispatch: Dispatch, setSourceCard: () => void) => {
	//TODO-NICE: allow grabbing from other cards
	const selectionData = selection.services.getSelection();
	if (selectionData) {
		const selectedStr = selectionData.text;

		setSourceCard();
		dispatch(selection.actions.updateManuallySelectedString(selectedStr));
	}
};
