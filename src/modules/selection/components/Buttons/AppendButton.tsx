import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import text from "../../../text";
import { getTargetConfig, getSourceConfig } from "../../selectors";
import { addCardAppendSelectionTarget, resetSelectionTarget } from "../../actions";
import { SelectionExistingCardTargetConfig, CardFieldIdentifier } from "../../model";
import { CardField } from "../../../cards/model/content";

export const AppendButton = ({ cardField, cardID }: { cardField: CardField; cardID: string }) => {
	const dispatch = useDispatch();

	const sourceConfig = useSelector(getSourceConfig);
	const targetConfig = useSelector(getTargetConfig);
	// outlined means this is the goal
	const [outlined, setOutlined] = useState(false);

	const cardIsTarget =
		!!targetConfig &&
		!!(targetConfig as CardFieldIdentifier).cardID &&
		(targetConfig as CardFieldIdentifier).cardID === cardID &&
		targetConfig.cardField === cardField;

	const isTarget = cardIsTarget && (targetConfig as SelectionExistingCardTargetConfig).updateType === "APPEND";

	if (isTarget) {
		if (!outlined) setOutlined(true);
	} else {
		if (outlined) setOutlined(false);
	}
	//TODO: test all variations of origin  (setting/copying) again (how to automate the test?)

	return (
		<text.components.BiggerTooltip
			title={
				isTarget
					? text.constants.CardIsAppendTargetTooltip
					: !!sourceConfig
					? text.constants.AppendToCardTooltip
					: text.constants.ChoiceCardAsAppendTarget
			}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<span>
				<IconButton
					type="button"
					onClick={() => {
						if (!outlined && !!!targetConfig) {
							dispatch(addCardAppendSelectionTarget(cardID, cardField));
						} else if (isTarget) {
							dispatch(resetSelectionTarget());
						}
					}}
					//TODO: global way to deactive field marking (also replace button)
					disabled={(cardIsTarget && !isTarget) || (!!targetConfig && !cardIsTarget)}
				>
					{outlined ? (
						<AddCircleOutlinedIcon fontSize="small"></AddCircleOutlinedIcon>
					) : (
						<AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
					)}
				</IconButton>
			</span>
		</text.components.BiggerTooltip>
	);
};
