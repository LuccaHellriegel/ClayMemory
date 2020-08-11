import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../cards";

//TODO: Undo / Redo for Card-Deletions

export const DeleteCardButton = ({ cardID }: { cardID: string }) => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(cards.actions.removeCard(cardID));
			}}
		>
			<DeleteForeverIcon></DeleteForeverIcon>
		</IconButton>
	);
};
