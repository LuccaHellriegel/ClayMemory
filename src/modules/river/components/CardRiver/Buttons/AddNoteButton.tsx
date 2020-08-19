import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";

export const AddNoteButton = () => {
	const dispatch = useDispatch();
	return (
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
	);
};
