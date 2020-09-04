import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector, useStore } from "react-redux";
import text from "../../../../text";
import selection from "../../../../selection";
import { CreationType } from "../../../../cards/model/model-config";
import display from "../../../../display";
import { CardOrigin } from "../../../../cards/model/model-origin";

export const AppendButton = ({ cardField, cardID }: { cardField: CreationType; cardID?: string }) => {
	const dispatch = useDispatch();
	const selectionParent = useSelector(selection.selectors.getCurrentSelectedParent);
	const store = useStore();

	return (
		<text.components.AppendButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					//TODO-NICE: allow append from other cards (origin-copying is the work here)
					if (selectionParent) {
						const origin: CardOrigin | undefined = display.selectors.getCurrentOrigin(store.getState());

						dispatch(selection.services.use_selection.selectionToCardAppend(cardField, origin, cardID));
					}
				}}
			>
				<AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
			</IconButton>
		</text.components.AppendButtonTooltip>
	);
};
