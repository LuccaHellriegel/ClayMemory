import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../cards";
import focus from "../../focus";

//TODO-RC: Undo / Redo for Card-Deletions
//TODO-RC: make confirmation overlap

export const DeleteCardButton = ({ cardID }: { cardID: string }) => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(cards.actions.removeCard(cardID));
			}}
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("EDITOR_CONTROL"));
			}}
		>
			<DeleteForeverIcon></DeleteForeverIcon>
		</IconButton>
	);
};