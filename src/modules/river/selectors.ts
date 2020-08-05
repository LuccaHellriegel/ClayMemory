import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState, RiverMakeUps, RiverCards } from "./model";
import { CardConfig } from "../cards/model";
import cards from "../cards";

export const getAll = (state: any) => state[NAME];

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getActiveRiverMakeUpIDs = createSelector(getAll, (state: CardRiverState) => state.activeRiverMakeUpIDs);

export const getActiveRiverMakeUps = createSelector(getRiverMakeUps, getActiveRiverMakeUpIDs, (makeUps, ids) =>
	ids.reduce((prev, id) => {
		prev[id] = makeUps[id];
		return prev;
	}, {} as RiverMakeUps)
);

export const getActiveRiversCardIDs = createSelector(getActiveRiverMakeUps, (makeUps) =>
	Object.keys(makeUps).reduce((prev, makeUpID) => {
		prev[makeUpID] = makeUps[makeUpID].cardIDs;
		return prev;
	}, {} as { [riverID: string]: string[] })
);

export const getActiveRiverCards = createSelector(
	getActiveRiversCardIDs,
	cards.selectors.getCards,
	(makeUpCardIDs, cards) =>
		Object.keys(makeUpCardIDs).reduce((prev, makeUpID) => {
			prev[makeUpID] = makeUpCardIDs[makeUpID].reduce((prev, id) => {
				prev[id] = cards[id];
				return prev;
			}, {} as { [cardID: string]: CardConfig });
			return prev;
		}, {} as RiverCards)
);
