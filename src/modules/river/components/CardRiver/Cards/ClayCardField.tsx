import React, { useState } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import selection from "../../../../selection";
import { useDispatch } from "react-redux";
import { SingleOrigin } from "../../../../cards/model/model-origin";

export const ClayCardField = ({
	storeValue = "",
	saveChanges,
	fieldOrigin,
	style,
	...rest
}: {
	storeValue?: string;
	// {} is an empty field of the QA-origin
	fieldOrigin?: SingleOrigin | {};
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
		<selection.components.CardFieldMouseUp
			fieldOrigin={
				fieldOrigin && (fieldOrigin as SingleOrigin).spanIndex !== undefined ? (fieldOrigin as SingleOrigin) : undefined
			}
		>
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
				style={style}
				{...rest}
			></TextField>
		</selection.components.CardFieldMouseUp>
	);
};
