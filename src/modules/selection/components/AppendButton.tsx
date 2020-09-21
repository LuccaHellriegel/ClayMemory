import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../text";
import { CreationType, CardFieldIdentifier } from "../../cards/model/config";
import { getGoalConfig, getSourceConfig } from "../selectors";
import { addCardAppendSelectionGoal, resetSelectionGoal } from "../actions";

export const AppendButton = ({ cardField, cardID }: { cardField: CreationType; cardID: string }) => {
	const dispatch = useDispatch();

	const sourceConfig = useSelector(getSourceConfig);
	const goalConfig = useSelector(getGoalConfig);
	// outlined means this is the goal
	const [outlined, setOutlined] = useState(false);

	const isGoal =
		!!goalConfig &&
		!!(goalConfig as CardFieldIdentifier).cardID &&
		(goalConfig as CardFieldIdentifier).cardID === cardID &&
		goalConfig.cardField === cardField;

	if (isGoal) {
		if (!outlined) setOutlined(true);
	} else {
		if (outlined) setOutlined(false);
	}
	//TODO-RC: test all variations of origin  (setting/copying) again (how to automate the test?)

	return (
		<Tooltip
			title={
				isGoal
					? text.constants.CardIsGoalTooltip
					: !!sourceConfig
					? text.constants.AppendToCardTooltip
					: text.constants.ChoiceCardAsGoal
			}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					if (!outlined && !!!goalConfig) {
						dispatch(addCardAppendSelectionGoal(cardID, cardField));
					} else if (isGoal) {
						dispatch(resetSelectionGoal());
					}
				}}
			>
				{outlined ? (
					<AddCircleOutlinedIcon fontSize="small"></AddCircleOutlinedIcon>
				) : (
					<AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
				)}
			</IconButton>
		</Tooltip>
	);
};
