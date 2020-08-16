import ExtensionIcon from "@material-ui/icons/Extension";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { CardOrigin, CreationType } from "../../../../cards/model";
import cards from "../../../../cards";
import focus from "../../../../focus";

//TODO-NICe: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-RC, if text from the field was already extracted this just opens the menu

//TODO-NICE: delete extracted str in source

// need this button: mouse-up in editor should not trigger context menu (cant select directly), because I cant delete selections then
export const ExtractFromFieldButton = ({
	cardOrigin,
	sourceField,
}: {
	cardOrigin?: CardOrigin;
	sourceField: CreationType;
}) => {
	const dispatch = useDispatch();

	return (
		<IconButton
			type="button"
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("EDITOR_CONTROL"));
			}}
			onClick={(event: any) => {
				dispatch(
					cards.actions.setSourceCard(event.clientX as number, event.clientY as number, sourceField, cardOrigin)
				);
			}}
		>
			<ExtensionIcon></ExtensionIcon>
		</IconButton>
	);
};
