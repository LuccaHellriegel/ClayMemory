import FindInPageIcon from "@material-ui/icons/FindInPage";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SingleOrigin } from "../../../../cards/model/origin";
import text from "../../../../text";
import { setOriginRequest } from "../../../actions";

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
					dispatch(setOriginRequest(cardOrigin));
				}}
			>
				<FindInPageIcon fontSize="small"></FindInPageIcon>
			</IconButton>
		</Tooltip>
	);
};
