import { createSelector } from "reselect";
import { CardsState } from "./model/state";
import { NAME } from "./constants";

export const getState = (state: any) => state[NAME];
export const hasPast = createSelector(getState, (cardsState: any) => cardsState.past.length > 0);
export const hasFuture = createSelector(getState, (cardsState: any) => cardsState.future.length > 0);

export const getAll = (state: any) => state[NAME].present;

export const getLastCardIDNumber = createSelector(getAll, (state) => state.lastCardIDNumber);

export const getCards = createSelector(getAll, (state: CardsState) => state.cards);

export const getCardByID = (state: any, cardID: string) => getCards(state)[cardID];
