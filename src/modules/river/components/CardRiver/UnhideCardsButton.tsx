import LayersClear from "@material-ui/icons/LayersClear";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";
import text from "../../../text";

export const UnhideCardsButton = () => {
	const dispatch = useDispatch();
	return (
		<text.components.UnhideCardsTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.riverUnhide());
				}}
			>
				<LayersClear></LayersClear>
			</IconButton>
		</text.components.UnhideCardsTooltip>
	);
};
