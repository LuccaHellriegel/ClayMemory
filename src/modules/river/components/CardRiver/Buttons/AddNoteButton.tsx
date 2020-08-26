import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";
import { newNoteCardTooltip } from "../../../../../shared/tooltips";

export const AddNoteButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={newNoteCardTooltip} enterDelay={1000} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(cards.actions.cardPush({ card: { type: "Note", content: "" } }));
				}}
				onMouseEnter={() => {
					dispatch(focus.actions.tryUpdateFocus("RIVER_CONTROL"));
				}}
			>
				<FeaturedVideoIcon></FeaturedVideoIcon>
			</IconButton>
		</Tooltip>
	);
};
