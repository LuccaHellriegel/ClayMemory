import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState } from "./model";
import cards from "../cards";

export const getAll = (state: any) => state[NAME];

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getActiveRiverMakeUpID = createSelector(getAll, (state: CardRiverState) => state.activeRiverMakeUpID);

export const getActiveRiverMakeUp = createSelector(
	getRiverMakeUps,
	getActiveRiverMakeUpID,
	(makeUps, id) => makeUps[id]
);

export const getActiveRiverCardIDs = createSelector(getActiveRiverMakeUp, (makeUp) => makeUp.cardIDs);

export const getActiveRiverCards = createSelector(
	getActiveRiverCardIDs,
	cards.selectors.getCards,
	(makeUpCardIDs, cards) => makeUpCardIDs.map((id) => cards[id])
);
