import { NAME } from "./constants";
import { createSelector } from "reselect";
import { CardRiverState, riverMakeUpIDToPageNumber } from "./model";
import cards from "../cards";
import { CardID } from "../cards/model/config";

export const getAll = (state: any): CardRiverState => state[NAME].present;

export const getRiverMakeUps = createSelector(getAll, (state: CardRiverState) => state.riverMakeUps);

export const getNonEmptyRiverIDs = createSelector(getRiverMakeUps, (makeUps) => Object.keys(makeUps));

export const getNonEmptyRiverIDsSorted = createSelector(getNonEmptyRiverIDs, (ids) =>
	ids.sort((a, b) => riverMakeUpIDToPageNumber(a) - riverMakeUpIDToPageNumber(b))
);

export const getNonEmptyRiverMakeUpsSorted = createSelector(getRiverMakeUps, (makeUps) =>
	Object.values(makeUps).sort((a, b) => riverMakeUpIDToPageNumber(a.riverID) - riverMakeUpIDToPageNumber(b.riverID))
);

export const getNonEmptyRiverCardsSorted = createSelector(
	getNonEmptyRiverMakeUpsSorted,
	cards.selectors.getCards,
	(makeUps, cards) => {
		const cardObjects = [];
		for (const makeUp of makeUps) {
			for (const id of makeUp.cardIDs) {
				cardObjects.push(cards[id]);
			}
		}

		return cardObjects;
	}
);

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

export const getRiverContentState = createSelector(getAll, (state: CardRiverState) => state.riverContentState);

export const getRiverContentFilter = createSelector(getAll, (state: CardRiverState) => state.contentFilter);

export const getOriginRequest = createSelector(getAll, (state) => state.requestedOrigin);
