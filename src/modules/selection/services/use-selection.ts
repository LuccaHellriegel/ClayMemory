import { CardConfig } from "../../cards/model/model-config";
import cards from "../../cards";
import { SelectionGoalConfig, SelectionSourceConfig, goalIsCreation, SelectionExistingCardGoalConfig } from "../model";
import { CardPayload } from "../../cards/model/model-payload";

const selectionConfigToCardPayload = (sourceConfig: SelectionSourceConfig, goalConfig: SelectionGoalConfig) => {
	const inputOrigin = sourceConfig.contentOrigin;
	const inputValue = sourceConfig.contentStr;

	const outputField = goalConfig.cardField;

	return {
		type: cards.model.model_config.cardFieldToType(outputField),
		content: cards.model.model_content.strToNewCardContent(inputValue, outputField),
		origin: inputOrigin ? cards.model.model_origin.singleOriginToCardOrigin(inputOrigin, outputField) : undefined,
	};
};

const selectionConfigToActualizedCardConfig = (
	sourceConfig: SelectionSourceConfig,
	goalConfig: SelectionExistingCardGoalConfig,
	state: any
): CardConfig => {
	const existingCard = cards.selectors.getCardByID(state, goalConfig.cardID);

	const inputOrigin = sourceConfig.contentOrigin;
	const inputValue = sourceConfig.contentStr;

	const outputField = goalConfig.cardField;

	return {
		...existingCard,
		content: cards.model.model_content.strToCardContent(
			inputValue,
			outputField,
			goalConfig.updateType,
			existingCard.content
		),
		origin: inputOrigin
			? cards.model.model_origin.singleOriginToCardOrigin(inputOrigin, outputField, existingCard.origin)
			: existingCard.origin,
	} as CardConfig;
};

export const selectionToCard = (
	sourceConfig: SelectionSourceConfig,
	goalConfig: SelectionGoalConfig,
	dispatch: any,
	state?: any
) => {
	const isCreation = goalIsCreation(goalConfig);
	if (isCreation) {
		const cardPayload: CardPayload = selectionConfigToCardPayload(sourceConfig, goalConfig);
		dispatch(cards.actions.cardPush(cardPayload));
	} else {
		const cardConfig = selectionConfigToActualizedCardConfig(
			sourceConfig,
			goalConfig as SelectionExistingCardGoalConfig,
			state
		);
		dispatch(cards.actions.cardReplace(cardConfig));
	}
};
