import PanToolIcon from "@material-ui/icons/PanTool";
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CardConfig, CreationType, GoalCard } from "../../../../cards/model";
import cards from "../../../../cards";
import focus from "../../../../focus";

const isGoalCard = (cardConfig: CardConfig, creationType: CreationType, goalCard: GoalCard) =>
	cardConfig.cardID === goalCard.cardID && creationType === goalCard.creationType;

export const GrabForFieldButton = ({
	cardConfig,
	creationType,
}: {
	cardConfig: CardConfig;
	creationType: CreationType;
}) => {
	const dispatch = useDispatch();
	const goalCard = useSelector(cards.selectors.getGoalCard);
	const [outlined, setOutlined] = useState(true);

	if (goalCard) {
		const isGoal = isGoalCard(cardConfig, creationType, goalCard);
		if (isGoal) {
			if (outlined) setOutlined(false);
		} else {
			if (!outlined) setOutlined(true);
		}
	} else {
		if (!outlined) setOutlined(true);
	}

	return (
		<IconButton
			type="button"
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("RIVER_CONTROL"));
			}}
			onClick={() => {
				if (outlined) {
					dispatch(cards.actions.setGoalCard(cardConfig, creationType));
				} else {
					dispatch(cards.actions.resetGoalCard());
				}
			}}
		>
			{outlined ? <PanToolOutlinedIcon></PanToolOutlinedIcon> : <PanToolIcon></PanToolIcon>}
		</IconButton>
	);
};
