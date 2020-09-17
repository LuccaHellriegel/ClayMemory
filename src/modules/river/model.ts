import { CardID } from "../cards/model/model-config";
import { CardField } from "../cards/model/model-content";
import { SingleOrigin } from "../cards/model/model-origin";

export type RiverMakeUp = { riverID: string; cardIDs: CardID[] };

export type RiverMakeUps = { [riverID: string]: RiverMakeUp };

export type RiverShowState = "SHOW" | "HIDE";

export type RiverContentState = "ALL" | "NOTES" | "QAS" | "NONE";

export type ContentFilter = string;

export type CardRiverState = {
	// works by first setting it here via button
	// then we scroll to the page
	// then we set the origin in the display-store
	// then we scroll to origin
	// all happens in the display module
	// TODO-NICE: move this somehow to display?
	// problem is that we depend on the display components (list-ref)
	// for scrolling
	requestedOrigin: SingleOrigin | null;
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpID: string;
	lastRiverIDNumber: number;
	// show/hide river
	riverShowState: RiverShowState;
	// filter content
	riverContentState: RiverContentState;
	// this is used to determine which card should be highlighted in reaction to hovering over it in the context-menu
	highlightedCardID: null | CardID;
	highlightedCardField: null | CardField;
	contentFilter: ContentFilter | "";
};

export const pageNumberToRiverMakeUpID = (page: number) => "CardRiver " + page;

export const riverMakeUpIDToPageNumber = (riverID: string) => parseInt(riverID.replace("CardRiver ", ""));

export const emptyCardRiver = (page: number): RiverMakeUp => {
	return {
		riverID: pageNumberToRiverMakeUpID(page),
		cardIDs: [],
	};
};

export const updateStateWithMakeUps = (state: CardRiverState, ...makeUps: RiverMakeUp[]) => {
	const updatedState = { ...state };
	makeUps.forEach((makeUp) => {
		updatedState.riverMakeUps[makeUp.riverID] = makeUp;
	});
	return updatedState;
};

// export const deactivateActiveCardRiver = (state: CardRiverState) => {
// 	return { ...state.riverMakeUps[state.activeRiverMakeUpID], active: false };
// };

export const removeCardFromRivers = (state: CardRiverState, cardID: CardID): CardRiverState => {
	const riverMakeUps = Object.fromEntries(
		Object.entries(state.riverMakeUps).map((entry) => [
			entry[0],
			{ ...entry[1], cardIDs: entry[1].cardIDs.filter((id) => id !== cardID) },
		])
	);
	return { ...state, riverMakeUps };
};
