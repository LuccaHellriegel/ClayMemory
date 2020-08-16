import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import display from "../../../../display";
import { SingleOrigin } from "../../../../cards/model";
import focus from "../../../../focus";

export const JumpToOriginButton = ({ cardOrigin }: { cardOrigin: SingleOrigin }) => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(focus.actions.updateDisplayFocus("ACTIVE_RIVER"));
				dispatch(display.actions.zoomToCardOrigin(cardOrigin.spanIndex, cardOrigin.page));
			}}
		>
			<FindInPageIcon></FindInPageIcon>
		</IconButton>
	);
};
