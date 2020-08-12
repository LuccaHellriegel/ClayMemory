import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import display from "../../display";
import { CardOrigin } from "../../cards/model";

export const JumpToOriginButton = ({ cardOrigin }: { cardOrigin: CardOrigin }) => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(display.actions.zoomToCardOrigin(cardOrigin.spanIndex, cardOrigin.page));
			}}
		>
			<FindInPageIcon></FindInPageIcon>
		</IconButton>
	);
};
