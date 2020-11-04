import RestorePageIcon from "@material-ui/icons/RestorePage";
import RestorePageOutlinedIcon from "@material-ui/icons/RestorePageOutlined";
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../../text";
import { getTargetConfig, getSourceConfig } from "../../selectors";
import { addCardReplaceSelectionTarget, resetSelectionTarget } from "../../actions";
import { SelectionExistingCardTargetConfig, CardFieldIdentifier } from "../../model";
import { CardField } from "../../../cards/model/content";

export const ReplaceButton = ({ cardField, cardID }: { cardField: CardField; cardID: string }) => {
	const dispatch = useDispatch();

	const sourceConfig = useSelector(getSourceConfig);
	const goalConfig = useSelector(getTargetConfig);
	// outlined means this is the goal
	const [outlined, setOutlined] = useState(false);

	const cardIsTarget =
		!!goalConfig &&
		!!(goalConfig as CardFieldIdentifier).cardID &&
		(goalConfig as CardFieldIdentifier).cardID === cardID &&
		goalConfig.cardField === cardField;

	const isTarget = cardIsTarget && (goalConfig as SelectionExistingCardTargetConfig).updateType === "REPLACE";

	if (isTarget) {
		if (!outlined) setOutlined(true);
	} else {
		if (outlined) setOutlined(false);
	}

	return (
		<text.components.BiggerTooltip
			title={
				isTarget
					? text.constants.CardIsReplaceTargetTooltip
					: !!sourceConfig
					? text.constants.ReplaceCardTooltip
					: text.constants.ChoiceCardAsReplaceTarget
			}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<span>
				<IconButton
					type="button"
					onClick={() => {
						if (!outlined && !!!goalConfig) {
							dispatch(addCardReplaceSelectionTarget(cardID, cardField));
						} else if (isTarget) {
							dispatch(resetSelectionTarget());
						}
					}}
					disabled={(cardIsTarget && !isTarget) || (!!goalConfig && !cardIsTarget)}
				>
					{outlined ? (
						<RestorePageIcon fontSize="small"></RestorePageIcon>
					) : (
						<RestorePageOutlinedIcon fontSize="small"></RestorePageOutlinedIcon>
					)}
				</IconButton>
			</span>
		</text.components.BiggerTooltip>
	);
};
