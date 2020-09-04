import PanToolIcon from "@material-ui/icons/PanTool";
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CardConfig } from "../../../../cards/model/model-config";
import { GoalCard } from "../../../../cards/model/model-state";
import cards from "../../../../cards";
import text from "../../../../text";
import { CardField } from "../../../../cards/model/model-content";

const isGoalCard = (cardConfig: CardConfig, cardField: CardField, goalCard: GoalCard) =>
	cardConfig.cardID === goalCard.cardID && cardField === goalCard.creationType;

export const GrabForFieldButton = ({ cardConfig, cardField }: { cardConfig: CardConfig; cardField: CardField }) => {
	const dispatch = useDispatch();
	const goalCard = useSelector(cards.selectors.getGoalCard);
	const [outlined, setOutlined] = useState(true);

	if (goalCard) {
		const isGoal = isGoalCard(cardConfig, cardField, goalCard);
		if (isGoal) {
			if (outlined) setOutlined(false);
		} else {
			if (!outlined) setOutlined(true);
		}
	} else {
		if (!outlined) setOutlined(true);
	}

	return (
		<Tooltip
			title={text.constants.grabForCardTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					if (outlined) {
						dispatch(cards.actions.setGoalCard(cardConfig, cardField));
					} else {
						dispatch(cards.actions.resetGoalCard());
					}
				}}
			>
				{outlined ? (
					<PanToolOutlinedIcon fontSize="small"></PanToolOutlinedIcon>
				) : (
					<PanToolIcon fontSize="small"></PanToolIcon>
				)}
			</IconButton>
		</Tooltip>
	);
};
