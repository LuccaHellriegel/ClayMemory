import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SingleOrigin } from "../../../../cards/model/model-origin";
import text from "../../../../text";

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
					//TODO-RC: needs to show the Document. If it is hiden this does not make sense.
					//TODO-RC: needs to change with multiple pages
					//dispatch(display.actions.zoomToCardOrigin(cardOrigin.spanIndex, cardOrigin.page));
				}}
			>
				<FindInPageIcon fontSize="small"></FindInPageIcon>
			</IconButton>
		</Tooltip>
	);
};
