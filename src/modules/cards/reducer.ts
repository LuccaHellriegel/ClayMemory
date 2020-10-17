import * as t from "./actionTypes";
import { cardIDToNumber } from "./model/config";
import { CardsState, removeCardFromCardsState, updateCardInCards } from "./model/state";
import { ClayMemoryPayloadAction } from "../../shared/utils";

const intialState: CardsState = {
	cards: {},
	lastCardIDNumber: 0,
};

const cards = (state = intialState, { type, payload }: ClayMemoryPayloadAction) => {
	switch (type) {
		case t.CARD_PUSH:
			const lastCardIDNumber = cardIDToNumber(payload.cardID) + 1;
			return { ...state, cards: updateCardInCards(state.cards, payload), lastCardIDNumber };
		case t.CARD_REPLACE:
			return { ...state, cards: updateCardInCards(state.cards, payload) };
		case t.CARD_REMOVE:
			return removeCardFromCardsState(state, payload as string);
		case t.ALL_CARDS_REPLACE:
			return payload as CardsState;
		case t.ALL_CARDS_RESET:
			return intialState;
		default:
			return state;
	}
};

export default cards;
