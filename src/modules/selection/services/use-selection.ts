import { CardConfig, CardPayload } from "../../cards/model/config";
import cards from "../../cards";
import {
	SelectionTargetConfig,
	SelectionSourceConfig,
	goalIsCreation,
	SelectionExistingCardTargetConfig,
} from "../model";
import { getNextCardID } from "../../cards/selectors";

const selectionConfigToCardPayload = (sourceConfig: SelectionSourceConfig, goalConfig: SelectionTargetConfig) => {
	const inputOrigin = sourceConfig.contentOrigin;
	const inputValue = sourceConfig.contentStr;

	const outputField = goalConfig.cardField;

	return {
		type: cards.model.config.cardFieldToType(outputField),
		content: cards.model.content.strToNewCardContent(inputValue, outputField),
		origin: inputOrigin ? cards.model.origin.singleOriginToCardOrigin(inputOrigin, outputField) : undefined,
	};
};

const selectionConfigToActualizedCardConfig = (
	sourceConfig: SelectionSourceConfig,
	goalConfig: SelectionExistingCardTargetConfig,
	state: any
): CardConfig => {
	const existingCard = cards.selectors.getCardByID(state, goalConfig.cardID);

	const inputOrigin = sourceConfig.contentOrigin;
	const inputValue = sourceConfig.contentStr;

	const outputField = goalConfig.cardField;

	return {
		...existingCard,
		content: cards.model.content.strToCardContent(inputValue, outputField, goalConfig.updateType, existingCard.content),
		origin: inputOrigin
			? cards.model.origin.singleOriginToCardOrigin(inputOrigin, outputField, existingCard.origin)
			: existingCard.origin,
	} as CardConfig;
};

export const selectionToCard = (
	sourceConfig: SelectionSourceConfig,
	goalConfig: SelectionTargetConfig,
	dispatch: any,
	state: any
) => {
	const isCreation = goalIsCreation(goalConfig);
	if (isCreation) {
		const cardPayload: CardPayload = selectionConfigToCardPayload(sourceConfig, goalConfig);
		const nextID = getNextCardID(state);
		dispatch(cards.actions.cardPush({ ...cardPayload, cardID: nextID } as CardConfig));
	} else {
		const cardConfig = selectionConfigToActualizedCardConfig(
			sourceConfig,
			goalConfig as SelectionExistingCardTargetConfig,
			state
		);
		dispatch(cards.actions.cardReplace(cardConfig));
	}
};
