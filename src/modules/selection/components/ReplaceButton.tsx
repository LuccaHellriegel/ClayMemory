import RestorePageIcon from "@material-ui/icons/RestorePage";
import RestorePageOutlinedIcon from "@material-ui/icons/RestorePageOutlined";
import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../text";
import { CreationType, CardFieldIdentifier } from "../../cards/model/config";
import { getGoalConfig, getSourceConfig } from "../selectors";
import { addCardReplaceSelectionGoal, resetSelectionGoal } from "../actions";
import { SelectionExistingCardGoalConfig } from "../model";

export const ReplaceButton = ({ cardField, cardID }: { cardField: CreationType; cardID: string }) => {
	const dispatch = useDispatch();

	const sourceConfig = useSelector(getSourceConfig);
	const goalConfig = useSelector(getGoalConfig);
	// outlined means this is the goal
	const [outlined, setOutlined] = useState(false);

	const isGoal =
		!!goalConfig &&
		!!(goalConfig as CardFieldIdentifier).cardID &&
		(goalConfig as CardFieldIdentifier).cardID === cardID &&
		goalConfig.cardField === cardField &&
		(goalConfig as SelectionExistingCardGoalConfig).updateType === "REPLACE";

	if (isGoal) {
		if (!outlined) setOutlined(true);
	} else {
		if (outlined) setOutlined(false);
	}

	return (
		<Tooltip
			title={
				isGoal
					? text.constants.CardIsReplaceGoalTooltip
					: !!sourceConfig
					? text.constants.ReplaceCardTooltip
					: text.constants.ChoiceCardAsReplaceGoal
			}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					if (!outlined && !!!goalConfig) {
						dispatch(addCardReplaceSelectionGoal(cardID, cardField));
					} else if (isGoal) {
						dispatch(resetSelectionGoal());
					}
				}}
			>
				{outlined ? (
					<RestorePageIcon fontSize="small"></RestorePageIcon>
				) : (
					<RestorePageOutlinedIcon fontSize="small"></RestorePageOutlinedIcon>
				)}
			</IconButton>
		</Tooltip>
	);
};
