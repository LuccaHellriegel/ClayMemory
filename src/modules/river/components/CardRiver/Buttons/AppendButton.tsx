import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../../../text";
import selection from "../../../../selection";
import { CardType, CreationType } from "../../../../cards/model/model";

export const AppendButton = ({
	type,
	creationType,
	cardID,
}: {
	type: CardType;
	creationType: CreationType;
	cardID?: string;
}) => {
	const dispatch = useDispatch();
	const selectionParent = useSelector(selection.selectors.getCurrentSelectedParent);

	return (
		<text.components.AppendButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					//TODO-NICE: allow append from other cards (origin-copying is the work here)
					if (selectionParent) dispatch(selection.actions.selectionToCardAppend(type, creationType, cardID));
				}}
			>
				<AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
			</IconButton>
		</text.components.AppendButtonTooltip>
	);
};
