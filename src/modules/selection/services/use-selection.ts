import { CreationType, UpdateType, CardID, CardConfig } from "../../cards/model/model-config";
import { CardOrigin } from "../../cards/model/model-origin";
import { getCurrentSelectedString, getSourceCard } from "../selectors";
import cards from "../../cards";
import { resetManuallySelectedString, resetSourceCard } from "../actions";
import { CardField } from "../../cards/model/model-content";

const selectionToCardBase = (
	creationType: CreationType,
	updateType: UpdateType,
	origin?: CardOrigin,
	cardID?: string
) => {
	return (dispatch: Function, getState: Function) => {
		const state = getState();

		const isUpdate = cardID !== undefined;

		let inputField: CardField;
		let inputOrigin;

		const sourceCard = getSourceCard(state);
		if (sourceCard) {
			dispatch(resetSourceCard());
			// if a soureCard exists, then we are working with a selection from a card and not the document,
			// so we need to use the sourceCard field
			inputField = sourceCard.sourceField;
			// origin should be from the SourceCard  in which the extract button has been clicked
			// if it exists
			// the SourceCard can or can not have an origin
			inputOrigin = sourceCard.origin;
		} else {
			// we exploit that the input from the document is always just a SingleOrigin=NoteOrigin
			// need to transform it because we can create also QA-Cards from document
			inputField = "note";
			// this origin is created by the caller of this function from the document
			inputOrigin = origin;
		}

		const selectedString = getCurrentSelectedString(state);

		if (isUpdate) {
			const currentCard = cards.selectors.getCardByID(getState(), cardID as CardID);
			const outputOrigin = inputOrigin
				? cards.services.transformInputOrigin(inputOrigin, inputField, creationType, currentCard.origin)
				: undefined;
			const config = cards.model.model_config.strToCardConfig(selectedString, creationType, updateType, currentCard);

			dispatch(cards.actions.cardUpdate({ ...config, origin: outputOrigin } as CardConfig));
		} else {
			const outputOrigin = inputOrigin
				? cards.services.transformInputOrigin(inputOrigin, inputField, creationType)
				: undefined;
			const emptyPayload = cards.model.model_payload.cardFieldToEmptyPayload(creationType);
			const cardPayload = cards.model.model_payload.strToCardPayload(
				selectedString,
				creationType,
				updateType,
				emptyPayload
			);

			dispatch(cards.actions.cardPush({ ...cardPayload, origin: outputOrigin }));
		}

		dispatch(resetManuallySelectedString());
	};
};

export const selectionToCardAppend = (creationType: CreationType, origin?: CardOrigin, cardID?: string) =>
	selectionToCardBase(creationType, "APPEND", origin, cardID);

export const selectionToCardReplace = (creationType: CreationType, origin?: CardOrigin, cardID?: string) =>
	selectionToCardBase(creationType, "REPLACE", origin, cardID);
