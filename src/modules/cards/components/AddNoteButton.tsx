import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import text from "../../text";
import { emptyNoteCard } from "../actions";

export const AddNoteButton = () => {
	const dispatch = useDispatch();
	return (
		<text.components.NewNoteCardTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(emptyNoteCard());
				}}
			>
				<FeaturedVideoIcon></FeaturedVideoIcon>
			</IconButton>
		</text.components.NewNoteCardTooltip>
	);
};
