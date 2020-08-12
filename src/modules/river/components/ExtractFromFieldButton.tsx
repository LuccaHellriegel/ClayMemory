import ExtensionIcon from "@material-ui/icons/Extension";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { CardOrigin } from "../../cards/model";
import cards from "../../cards";
import focus from "../../focus";

//TODO-NICe: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-RC, if text from the filed was already extracted this just opens the menu

export const ExtractFromFieldButton = ({ cardOrigin }: { cardOrigin?: CardOrigin }) => {
	const dispatch = useDispatch();

	return (
		<IconButton
			type="button"
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("EDITOR_CONTROL"));
			}}
			onClick={(event: any) => {
				dispatch(cards.actions.setSourceCard(event.clientX as number, event.clientY as number, cardOrigin));
			}}
		>
			<ExtensionIcon></ExtensionIcon>
		</IconButton>
	);
};
