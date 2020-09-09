import { createSelector } from "reselect";
import { CardsState } from "./model/model-state";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME].present;

export const getLastCardIDNumber = createSelector(getAll, (state) => state.lastCardIDNumber);

export const getCards = createSelector(getAll, (state: CardsState) => state.cards);

export const getCardByID = (state: any, cardID: string) => getCards(state)[cardID];
