import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import display from "../../../../display";
import { SingleOrigin } from "../../../../cards/model/model-origin";
import focus from "../../../../focus";
import text from "../../../../text";

//TODO-NICE: replace/simplify focus system with element specific mouse-listeners
export const JumpToOriginButton = ({ cardOrigin }: { cardOrigin: SingleOrigin }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.jumpToOriginTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(focus.actions.updateDisplayFocus("ACTIVE_RIVER"));
					dispatch(display.actions.zoomToCardOrigin(cardOrigin.spanIndex, cardOrigin.page));
				}}
			>
				<FindInPageIcon fontSize="small"></FindInPageIcon>
			</IconButton>
		</Tooltip>
	);
};
