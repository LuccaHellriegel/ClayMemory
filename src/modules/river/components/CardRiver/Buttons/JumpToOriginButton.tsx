import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import display from "../../../../display";
import { SingleOrigin } from "../../../../cards/model/model-origin";
import focus from "../../../../focus";
import { jumpToOriginTooltip } from "../../../../../shared/tooltips";

export const JumpToOriginButton = ({ cardOrigin }: { cardOrigin: SingleOrigin }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={jumpToOriginTooltip} enterDelay={1000} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(focus.actions.updateDisplayFocus("ACTIVE_RIVER"));
					dispatch(display.actions.zoomToCardOrigin(cardOrigin.spanIndex, cardOrigin.page));
				}}
			>
				<FindInPageIcon></FindInPageIcon>
			</IconButton>
		</Tooltip>
	);
};
