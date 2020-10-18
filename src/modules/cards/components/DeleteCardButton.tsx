import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { CardID } from "../model/config";
import text from "../../text";
import { actions } from "../slice";

export const DeleteCardButton = ({ cardID }: { cardID: CardID }) => {
	const dispatch = useDispatch();
	return (
		<text.components.DeleteCardButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.cardRemove(cardID));
				}}
			>
				<DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
			</IconButton>
		</text.components.DeleteCardButtonTooltip>
	);
};
