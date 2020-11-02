import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../../text";
import { getNextCardID } from "../../selectors";
import { emptyQA } from "../../model/config";
import { actions } from "../../slice";

export const AddQAButton = () => {
	const dispatch = useDispatch();
	const nextID = useSelector(getNextCardID);

	return (
		<text.components.AddQAButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.cardPush(emptyQA(nextID)));
				}}
			>
				<FeaturedPlayListIcon></FeaturedPlayListIcon>
			</IconButton>
		</text.components.AddQAButtonTooltip>
	);
};
