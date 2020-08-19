import { CardRiverState, RiverShowState, pageNumberToRiverMakeUpID, RiverMakeUp, RiverContentState } from "./model";
import { FinalizedCardPayload, CardID } from "../cards/model";
import cards from "../cards";
import * as t from "./actionTypes";
import display from "../display";
import focus from "../focus";
import { UserFocus } from "../focus/model";
import { ArchiveRiver } from "../db/model";
import db from "../db";

const initialState: CardRiverState = {
	riverMakeUps: {
		[pageNumberToRiverMakeUpID(1)]: {
			riverID: pageNumberToRiverMakeUpID(1),
			cardIDs: ["2", "0", "1"],
		},
	},
	pushToRiverID: pageNumberToRiverMakeUpID(1),
	activeRiverMakeUpID: pageNumberToRiverMakeUpID(1),
	lastRiverIDNumber: 1,
	riverShowState: "SHOW",
	highlightedCardID: null,
	highlightedCardField: null,
	riverContentState: "ALL",
	sourceCard: null,
};

const emptyCardRiver = (page: number): RiverMakeUp => {
	return {
		riverID: pageNumberToRiverMakeUpID(page),
		cardIDs: [],
	};
};

const updateStateWithMakeUps = (state: CardRiverState, ...makeUps: RiverMakeUp[]) => {
	const updatedState = { ...state };
	makeUps.forEach((makeUp) => {
		updatedState.riverMakeUps[makeUp.riverID] = makeUp;
	});
	return updatedState;
};

const deactivateActiveCardRiver = (state: CardRiverState) => {
	return { ...state.riverMakeUps[state.activeRiverMakeUpID], active: false };
};

const removeCardFromRivers = (state: CardRiverState, cardID: CardID): CardRiverState => {
	const riverMakeUps = Object.fromEntries(
		Object.entries(state.riverMakeUps).map((entry) => [
			entry[0],
			{ ...entry[1], cardIDs: entry[1].cardIDs.filter((id) => id !== cardID) },
		])
	);
	return { ...state, riverMakeUps };
};

const cardRiverState = (state = initialState, { type, payload }: { type: string; payload: any }) => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case display.actionTypes.PAGE_UPDATE:
			let activeRiver;
			if (!state.riverMakeUps[pageNumberToRiverMakeUpID(payload as number)]) {
				activeRiver = emptyCardRiver(payload as number);
			} else {
				activeRiver = { ...state.riverMakeUps[pageNumberToRiverMakeUpID(payload as number)] };
			}

			const oldRiver = deactivateActiveCardRiver(state);

			return {
				...updateStateWithMakeUps(state, activeRiver, oldRiver),
				activeRiverMakeUpID: activeRiver.riverID,
				pushToRiverID: activeRiver.riverID,
			};

		case cards.actionTypes.CARD_PUSH:
			riverMakeUp = {
				...state.riverMakeUps[state.pushToRiverID],
				cardIDs: [...state.riverMakeUps[state.pushToRiverID].cardIDs, (payload as FinalizedCardPayload).card.cardID],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[state.pushToRiverID] = riverMakeUp;

			return { ...state, riverMakeUps: riverMakeUps };
		case cards.actionTypes.CARD_REMOVE:
			return removeCardFromRivers(state, payload as string);
		case t.RIVER_SHOW_STATE:
			return { ...state, riverShowState: payload as RiverShowState };
		case t.RIVER_CONTENT_STATE:
			return { ...state, riverContentState: payload as RiverContentState };
		case t.RIVER_PUSH_STATE:
			return { ...state, pushToRiverID: payload };
		case t.RIVER_HOVERED_CARD:
			return { ...state, highlightedCardID: payload.id, highlightedCardField: payload.field };
		case focus.actionTypes.FOCUS_UPDATE:
			let sourceCard = state.sourceCard;

			//TODO-NICE: untangle the focus logic, might be that I can just reset in the first case
			// need to reset sourceCard because we want to trigger the correct Selection-Grab when in the document
			if ((payload as UserFocus) === "DOCUMENT" && sourceCard) {
				sourceCard = null;
			}

			// reset hovered-card once we are not focused on the context menu
			//TODO-NICE: investigate a better factoring for the relation between river and creation
			if (state.highlightedCardID !== null && (payload as UserFocus) !== "CONTEXT_MENU") {
				return { ...state, highlightedCardID: null, highlightedCardField: null, sourceCard };
			} else {
				return { ...state, sourceCard };
			}
		case cards.actionTypes.GLOBAL_RESET:
			if (payload) {
				return {
					...initialState,
					riverMakeUps: (payload as ArchiveRiver).riverMakeUps,
					activeRiverMakeUpID: (payload as ArchiveRiver).activeRiverMakeUpID,
					pushToRiverID: (payload as ArchiveRiver).pushToRiverID,
					lastRiverIDNumber: (payload as ArchiveRiver).lastRiverIDNumber,
				};
			} else {
				return initialState;
			}
		case db.actionTypes.LOAD_DOCUMENT_DATA_SETS:
			// basically the same as GLOBAL_RESET, just only triggered
			//when uploading data that corresponds to current document
			// and if not, we dont reset
			if (payload.newActiveDataSet) {
				return {
					...initialState,
					riverMakeUps: (payload.newActiveDataSet as ArchiveRiver).riverMakeUps,
					activeRiverMakeUpID: (payload.newActiveDataSet as ArchiveRiver).activeRiverMakeUpID,
					pushToRiverID: (payload.newActiveDataSet as ArchiveRiver).pushToRiverID,
					lastRiverIDNumber: (payload.newActiveDataSet as ArchiveRiver).lastRiverIDNumber,
				};
			} else {
				return state;
			}
		case t.RIVER_CARD_SOURCE:
			return { ...state, sourceCard: payload };
		default:
			return state;
	}
};

export default cardRiverState;
