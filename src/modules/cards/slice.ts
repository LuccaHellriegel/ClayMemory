import { CardConfig, CardID, cardIDToNumber, strToCardConfig } from "./model/config";
import { Cards, CardsState } from "./model/state";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { CardField } from "./model/content";

const initialState: CardsState = {
	cards: {},
	lastCardIDNumber: 0,
};

const updateCardInCards = (cards: Cards, toBeUpdated: CardConfig) => {
	const cardObj = { ...cards };
	cardObj[toBeUpdated.cardID] = toBeUpdated;
	return cardObj;
};

const cardPush: CaseReducer<CardsState, PayloadAction<CardConfig>> = (state, { payload }) => {
	return {
		...state,
		cards: updateCardInCards(state.cards, payload),
		lastCardIDNumber: cardIDToNumber(payload.cardID) + 1,
	};
};

const cardReplace: CaseReducer<CardsState, PayloadAction<CardConfig>> = (state, { payload }) => {
	return { ...state, cards: updateCardInCards(state.cards, payload) };
};

const cardFieldReplace: CaseReducer<
	CardsState,
	PayloadAction<{ cardField: CardField; cardConfig: CardConfig; newValue: string }>
> = (state, { payload }) => {
	return {
		...state,
		cards: updateCardInCards(
			state.cards,
			strToCardConfig(payload.newValue, payload.cardField, "REPLACE", payload.cardConfig)
		),
	};
};

const cardRemove: CaseReducer<CardsState, PayloadAction<CardID>> = (state, { payload }) => {
	const cards = { ...state.cards };

	// we do not reset the ID counter
	delete cards[payload];

	return { ...state, cards };
};

const allCardsReplace: CaseReducer<CardsState, PayloadAction<CardsState>> = (_, { payload }) => {
	return payload;
};

const allCardsReset: CaseReducer<CardsState> = () => {
	return initialState;
};

const cardsSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		cardPush,
		cardReplace,
		cardFieldReplace,
		cardRemove,
		allCardsReplace,
		allCardsReset,
	},
});

export const { actions } = cardsSlice;

export default cardsSlice;
