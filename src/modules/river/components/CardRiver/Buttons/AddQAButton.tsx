import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";
import text from "../../../../text";

export const AddQAButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.newQACardTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(cards.actions.emptyQACard());
				}}
				onMouseEnter={() => {
					dispatch(focus.actions.tryUpdateFocus("RIVER_CONTROL"));
				}}
			>
				<FeaturedPlayListIcon></FeaturedPlayListIcon>
			</IconButton>
		</Tooltip>
	);
};
