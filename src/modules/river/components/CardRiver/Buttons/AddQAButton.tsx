import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";

export const AddQAButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(cards.actions.cardPush({ card: { type: "Q-A", content: { q: "", a: "" } } }));
			}}
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("RIVER_CONTROL"));
			}}
		>
			<FeaturedPlayListIcon></FeaturedPlayListIcon>
		</IconButton>
	);
};
