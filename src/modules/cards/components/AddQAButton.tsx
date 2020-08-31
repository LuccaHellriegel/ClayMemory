import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import text from "../../text";
import { emptyQACard } from "../actions";

export const AddQAButton = () => {
	const dispatch = useDispatch();
	return (
		<text.components.AddQAButtonTooltip>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(emptyQACard());
				}}
			>
				<FeaturedPlayListIcon></FeaturedPlayListIcon>
			</IconButton>
		</text.components.AddQAButtonTooltip>
	);
};
