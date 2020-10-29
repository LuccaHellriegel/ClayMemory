import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SingleOrigin } from "../../../../cards/model/origin";
import text from "../../../../text";
import { actions } from "../../../slice";

export const JumpToOriginButton = ({ cardOrigin }: { cardOrigin: SingleOrigin }) => {
	const dispatch = useDispatch();
	return (
		<text.components.BiggerTooltip
			title={text.constants.jumpToOriginTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.riverOriginRequest(cardOrigin));
				}}
			>
				<FindInPageIcon fontSize="small"></FindInPageIcon>
			</IconButton>
		</text.components.BiggerTooltip>
	);
};
