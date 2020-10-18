import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../text";
import { getNextCardID } from "../selectors";
import { emptyNote } from "../model/config";
import { actions } from "../slice";

export const AddNoteButton = () => {
	const dispatch = useDispatch();
	const nextID = useSelector(getNextCardID);
	return (
		<text.components.NewNoteCardTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.cardPush(emptyNote(nextID)));
				}}
			>
				<FeaturedVideoIcon></FeaturedVideoIcon>
			</IconButton>
		</text.components.NewNoteCardTooltip>
	);
};
