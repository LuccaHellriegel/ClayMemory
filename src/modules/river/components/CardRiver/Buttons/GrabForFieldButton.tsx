import PanToolIcon from "@material-ui/icons/PanTool";
import PanToolOutlinedIcon from "@material-ui/icons/PanToolOutlined";
import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { CardConfig, CardFieldIdentifier } from "../../../../cards/model/model-config";
import cards from "../../../../cards";
import text from "../../../../text";
import { CardField } from "../../../../cards/model/model-content";
import selection from "../../../../selection";

export const GrabForFieldButton = ({ cardConfig, cardField }: { cardConfig: CardConfig; cardField: CardField }) => {
	const dispatch = useDispatch();
	const goalConfig = useSelector(selection.selectors.getGoalConfig);
	const [outlined, setOutlined] = useState(true);

	const isGoal =
		!!goalConfig &&
		!!(goalConfig as CardFieldIdentifier).cardID &&
		(goalConfig as CardFieldIdentifier).cardID === cardConfig.cardID &&
		goalConfig.cardField === cardField;

	if (isGoal) {
		if (outlined) setOutlined(false);
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
					if (outlined && !!!goalConfig) {
						dispatch(
							selection.actions.addCardSelectionSource(
								cards.model.model_permutation.toFieldValue(cardField, cardConfig.origin)
							)
						);
					} else if (isGoal) {
						dispatch(selection.actions.resetSelectionGoal());
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
