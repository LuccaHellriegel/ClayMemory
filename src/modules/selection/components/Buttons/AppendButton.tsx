import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../../text";
import { getGoalConfig, getSourceConfig } from "../../selectors";
import { addCardAppendSelectionGoal, resetSelectionGoal } from "../../actions";
import { SelectionExistingCardGoalConfig, CardFieldIdentifier } from "../../model";
import { CardField } from "../../../cards/model/content";

export const AppendButton = ({ cardField, cardID }: { cardField: CardField; cardID: string }) => {
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
		(goalConfig as SelectionExistingCardGoalConfig).updateType === "APPEND";

	if (isGoal) {
		if (!outlined) setOutlined(true);
	} else {
		if (outlined) setOutlined(false);
	}
	//TODO: test all variations of origin  (setting/copying) again (how to automate the test?)

	return (
		<text.components.BiggerTooltip
			title={
				isGoal
					? text.constants.CardIsAppendGoalTooltip
					: !!sourceConfig
					? text.constants.AppendToCardTooltip
					: text.constants.ChoiceCardAsAppendGoal
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
		</text.components.BiggerTooltip>
	);
};
