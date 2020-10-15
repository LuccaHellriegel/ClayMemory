import * as t from "./actionTypes";
import { cardIDToNumber } from "./model/config";
import {
	CardsState,
	removeCardFromCardsState,
	updateCardInCards,
	addCardToCards,
	replaceCardsInCardsState,
} from "./model/state";
import { ArchiveCards } from "../db/model";
import db from "../db";
import { ClayMemoryPayloadAction } from "../../shared/utils";

const intialState: CardsState = {
	cards: {},
	lastCardIDNumber: 0,
};

const cards = (state = intialState, { type, payload }: ClayMemoryPayloadAction) => {
	switch (type) {
		case t.CARD_PUSH:
			const lastCardIDNumber = cardIDToNumber(payload.cardID) + 1;
			return { ...state, cards: addCardToCards(state.cards, payload), lastCardIDNumber };
		case t.CARD_REPLACE:
			return { ...state, cards: updateCardInCards(state.cards, payload) };
		case t.CARD_REMOVE:
			return removeCardFromCardsState(state, payload as string);
		case db.actionTypes.DOCUMENT_CHANGE:
			if (payload) {
				return replaceCardsInCardsState(
					intialState,
					(payload as ArchiveCards).cards,
					(payload as ArchiveCards).lastCardIDNumber
				);
			} else {
				return intialState;
			}
		case db.actionTypes.LOAD_DOCUMENT_DATA_SETS:
			// basically the same as DOCUMENT_CHANGE, just only triggered
			// when uploading data that corresponds to current document
			// and if not we dont reset
			if (payload.newActiveDataSet) {
				return replaceCardsInCardsState(
					intialState,
					(payload as ArchiveCards).cards,
					(payload as ArchiveCards).lastCardIDNumber
				);
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default cards;
