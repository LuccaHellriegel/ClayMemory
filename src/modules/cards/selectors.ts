import { createSelector } from "reselect";
import { CardsState } from "./model";

export const getAll = (state: any) => state.cards as CardsState;

export const getLastCardIDNumber = createSelector(getAll, (state) => state.lastCardIDNumber);

export const getCards = createSelector(getAll, (state: CardsState) => state.cards);
