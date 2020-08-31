import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { CardID } from "../model/model";
import text from "../../text";
import { removeCard } from "../actions";

//TODO-NICE: use storybook for visual component testing

export const DeleteCardButton = ({ cardID }: { cardID: CardID }) => {
	const dispatch = useDispatch();
	return (
		<text.components.DeleteCardButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(removeCard(cardID));
				}}
			>
				<DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
			</IconButton>
		</text.components.DeleteCardButtonTooltip>
	);
};
