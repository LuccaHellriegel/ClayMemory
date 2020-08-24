import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { ActionCreators } from "redux-undo";
// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
export const UndoButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(ActionCreators.undo());
			}}
		>
			<UndoIcon></UndoIcon>
		</IconButton>
	);
};
export const RedoButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(ActionCreators.redo());
			}}
		>
			<RedoIcon></RedoIcon>
		</IconButton>
	);
};
