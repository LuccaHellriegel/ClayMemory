import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState } from "./model";
import cards from "../cards";

export const getAll = (state: any) => state[NAME];

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getActiveRiverMakeUpID = createSelector(getAll, (state: CardRiverState) => state.activeRiverMakeUpID);

export const getPushToRiver = createSelector(getAll, (state: CardRiverState) => state.pushToRiverID);

export const getPushToRiverMakeUp = createSelector(getRiverMakeUps, getPushToRiver, (makeUps, id) => makeUps[id]);

export const getActiveRiverMakeUp = createSelector(
	getRiverMakeUps,
	getActiveRiverMakeUpID,
	(makeUps, id) => makeUps[id]
);

export const getPushToRiverCardIDs = createSelector(getPushToRiverMakeUp, (makeUp) => makeUp.cardIDs);

export const getPushToRiverCards = createSelector(
	getPushToRiverCardIDs,
	cards.selectors.getCards,
	(makeUpCardIDs, cards) => makeUpCardIDs.map((id) => cards[id])
);

//TODO-NICE: rename active=page-wise or smth like that for clarity
export const getActiveRiverCardIDs = createSelector(getActiveRiverMakeUp, (makeUp) => makeUp.cardIDs);

export const getActiveRiverCards = createSelector(
	getActiveRiverCardIDs,
	cards.selectors.getCards,
	(makeUpCardIDs, cards) => makeUpCardIDs.map((id) => cards[id])
);

export const getRiverShowState = createSelector(getAll, (state: CardRiverState) => state.riverShowState);

export const riverShowStateIsShow = createSelector(getRiverShowState, (state) => state === "SHOW");

export const getHoveredCardData = createSelector(getAll, (state: CardRiverState) => {
	return { id: state.hoveredCard, field: state.hoveredField };
});

export const getLastRiverIDNumber = createSelector(getAll, (state: CardRiverState) => state.lastRiverIDNumber);
