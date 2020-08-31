import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";
import { CardID } from "../../../../cards/model/model";
import text from "../../../../text";

//TODO-NICE: use storybook for visual component testing

export const DeleteCardButton = ({ cardID }: { cardID: CardID }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.deleteCardTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(cards.actions.removeCard(cardID));
				}}
				onMouseEnter={() => {
					dispatch(focus.actions.tryUpdateFocus("RIVER_CONTROL"));
				}}
			>
				<DeleteForeverIcon fontSize="small"></DeleteForeverIcon>
			</IconButton>
		</Tooltip>
	);
};
