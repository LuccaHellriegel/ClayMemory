import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState } from "./model";

export const getAll = (state: any) => state[NAME];

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getActiveRiverMakeUpIDs = createSelector(getAll, (state: CardRiverState) => state.activeRiverMakeUpIDs);

export const getActiveRiverMakeUps = createSelector(getRiverMakeUps, getActiveRiverMakeUpIDs, (makeUps, ids) =>
	ids.map((id) => makeUps[id])
);
