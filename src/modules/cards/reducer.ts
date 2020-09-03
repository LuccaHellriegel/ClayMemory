import * as t from "./actionTypes";
import { CardsState, FinalizedCardPayload, CardID } from "./model/model";
import { ArchiveCards } from "../db/model";
import db from "../db";

const intialState: CardsState = {
	cards: {
		"0": {
			cardID: "0",
			type: "Q-A",
			content: { q: "Was ist der Sinn des Lebens?", a: "42" },
		},
		"1": {
			cardID: "1",
			type: "Q-A",
			content: { q: "Welches Layout macht mehr Sinn?", a: "??" },
		},
		"2": { cardID: "2", type: "Note", content: "Note here" },
	},
	lastCardIDNumber: 2,
	goalCard: null,
};

const removeCard = (state: CardsState, cardID: CardID) => {
	const cards = { ...state.cards };

	// we do not reset the ID counter

	delete cards[cardID];

	return { ...state, cards };
};

const cards = (state = intialState, { type, payload }: { type: string; payload?: any }) => {
	let cardID;
	let cardObj;
	switch (type) {
		case t.CARD_PUSH:
			const lastCardIDNumber = state.lastCardIDNumber + 1;

			cardObj = { ...state.cards };
			cardObj[(payload as FinalizedCardPayload).card.cardID] = (payload as FinalizedCardPayload).card;

			return { ...state, cards: cardObj, lastCardIDNumber };
		case t.CARD_UPDATE:
			cardID = (payload as FinalizedCardPayload).card.cardID as string;
			cardObj = { ...state.cards };
			cardObj[cardID] = (payload as FinalizedCardPayload).card;

			// either the update was for a goalCard, then we want to reset it
			// or the update was not for a goalCard, then there should not be a goalCard anyways
			const goalCard = null;

			return { ...state, cards: cardObj, goalCard };
		case t.CARD_REMOVE:
			return removeCard(state, payload as string);
		case t.CARD_GOAL:
			return { ...state, goalCard: payload };
		case db.actionTypes.DOCUMENT_CHANGE:
			if (payload) {
				return {
					...intialState,
					cards: (payload as ArchiveCards).cards,
					lastCardIDNumber: (payload as ArchiveCards).lastCardIDNumber,
				};
			} else {
				return intialState;
			}
		case db.actionTypes.LOAD_DOCUMENT_DATA_SETS:
			// basically the same as DOCUMENT_CHANGE, just only triggered
			// when uploading data that corresponds to current document
			// and if not we dont reset
			if (payload.newActiveDataSet) {
				return {
					...intialState,
					cards: (payload.newActiveDataSet as ArchiveCards).cards,
					lastCardIDNumber: (payload.newActiveDataSet as ArchiveCards).lastCardIDNumber,
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default cards;
