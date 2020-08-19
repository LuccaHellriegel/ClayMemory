import { createSelector } from "reselect";
import { CardsState } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME].present;

export const getLastCardIDNumber = createSelector(getAll, (state) => state.lastCardIDNumber);

export const getCards = createSelector(getAll, (state: CardsState) => state.cards);

export const getGoalCard = createSelector(getAll, (state: CardsState) => state.goalCard);
