import { useState } from "react";
import MouseIcon from "@material-ui/icons/Mouse";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { toggleSelectionType } from "../actions";

export const SelectionTypeButton = () => {
	const [outlined, setOutlined] = useState(true);
	const dispatch = useDispatch();

	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(toggleSelectionType());
				setOutlined(!outlined);
			}}
		>
			{outlined ? <MouseIcon></MouseIcon> : <BorderAllIcon></BorderAllIcon>}
		</IconButton>
	);
};
