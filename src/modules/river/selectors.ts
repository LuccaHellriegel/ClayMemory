import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState } from "./model";
import cards from "../cards";
import { CardID } from "../cards/model/config";

export const getAll = (state: any): CardRiverState => state[NAME].present;

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getActiveRiverMakeUpID = createSelector(getAll, (state: CardRiverState) => state.activeRiverMakeUpID);

export const getActiveRiverMakeUp = createSelector(getRiverMakeUps, getActiveRiverMakeUpID, (makeUps, id) => {
	const makeUp = makeUps[id];
	return makeUp ? makeUp : { cardIDs: [] };
});

export const getActiveRiverCardIDs = createSelector(getActiveRiverMakeUp, (makeUp): CardID[] => makeUp.cardIDs);

export const getActiveRiverCards = createSelector(
	getActiveRiverCardIDs,
	cards.selectors.getCards,
	(makeUpCardIDs, cards) => makeUpCardIDs.map((id) => cards[id])
);

export const getRiverShowState = createSelector(getAll, (state: CardRiverState) => state.riverShowState);

export const riverShowStateIsShow = createSelector(getRiverShowState, (state) => state === "SHOW");

export const getLastRiverIDNumber = createSelector(getAll, (state: CardRiverState) => state.lastRiverIDNumber);

export const getRiverContentState = createSelector(getAll, (state: CardRiverState) => state.riverContentState);

export const getRiverContentFilter = createSelector(getAll, (state: CardRiverState) => state.contentFilter);

export const getOriginRequest = createSelector(getAll, (state) => state.requestedOrigin);
