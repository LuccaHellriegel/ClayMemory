import React, { useState } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";

export const HybridCardField = ({
	storeValue = "",
	saveChanges,
	style,
	...rest
}: {
	storeValue?: string;
	saveChanges: (value: string) => void;
	style: any;
} & TextFieldProps) => {
	const [state, setState] = useState({ storeValue, mutableValue: storeValue });

	// reset if new storeValue, otherwise keep user-mutated value
	if (state.storeValue !== storeValue) {
		setState({ storeValue, mutableValue: storeValue });
	}

	// need the onChange-pattern, because we want to be able to pre-fill the field from the store
	return (
		<TextField
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
	);
};
