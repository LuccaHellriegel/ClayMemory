import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState } from "./model";

export const getAll = (state: any) => state[NAME];

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);
