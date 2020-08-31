import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import focus from "../../../../focus";
import text from "../../../../text";

export const AddNoteButton = () => {
	const dispatch = useDispatch();
	return (
		<focus.components.RiverControlFocusUpdater>
			<text.components.NewNoteCardTooltip>
				<IconButton
					type="button"
					onClick={() => {
						dispatch(cards.actions.emptyNoteCard());
					}}
				>
					<FeaturedVideoIcon></FeaturedVideoIcon>
				</IconButton>
			</text.components.NewNoteCardTooltip>
		</focus.components.RiverControlFocusUpdater>
	);
};
