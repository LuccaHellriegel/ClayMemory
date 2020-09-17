import {
	CardRiverState,
	RiverShowState,
	pageNumberToRiverMakeUpID,
	RiverContentState,
	removeCardFromRivers,
} from "./model";
import { CardConfig } from "../cards/model/model-config";
import cards from "../cards";
import * as t from "./actionTypes";
import { ArchiveRiver } from "../db/model";
import db from "../db";

const initialState: CardRiverState = {
	requestedOrigin: null,
	riverMakeUps: {
		[pageNumberToRiverMakeUpID(1)]: {
			riverID: pageNumberToRiverMakeUpID(1),
			cardIDs: ["2", "0", "1"],
		},
	},
	activeRiverMakeUpID: pageNumberToRiverMakeUpID(1),
	lastRiverIDNumber: 1,
	riverShowState: "SHOW",
	riverContentState: "ALL",
	contentFilter: "",
};

// TODO-NICE: adding to one river forces all of them to update, should not be a problem, because we only render 2-3 rivers,
// but memo just in case?
const cardRiverState = (state = initialState, { type, payload }: { type: string; payload: any }): CardRiverState => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case t.RIVER_ACTIVE_ID:
			return { ...state, activeRiverMakeUpID: payload };
		case t.RIVER_SHOW_STATE:
			return { ...state, riverShowState: payload as RiverShowState };
		case t.RIVER_CONTENT_STATE:
			return { ...state, riverContentState: payload as RiverContentState };
		case cards.actionTypes.CARD_PUSH:
			if (state.riverMakeUps[state.activeRiverMakeUpID]) {
				riverMakeUp = {
					...state.riverMakeUps[state.activeRiverMakeUpID],
					cardIDs: [...state.riverMakeUps[state.activeRiverMakeUpID].cardIDs, (payload as CardConfig).cardID],
				};
			} else {
				// create new river
				riverMakeUp = {
					riverID: state.activeRiverMakeUpID,
					cardIDs: [(payload as CardConfig).cardID],
				};
			}
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[state.activeRiverMakeUpID] = riverMakeUp;

			return { ...state, riverMakeUps: riverMakeUps };
		case cards.actionTypes.CARD_REMOVE:
			return removeCardFromRivers(state, payload as string);
		case db.actionTypes.DOCUMENT_CHANGE:
			if (payload) {
				return {
					...initialState,
					riverMakeUps: (payload as ArchiveRiver).riverMakeUps,
					lastRiverIDNumber: (payload as ArchiveRiver).lastRiverIDNumber,
				};
			} else {
				return initialState;
			}
		case db.actionTypes.LOAD_DOCUMENT_DATA_SETS:
			// basically the same as DOCUMENT_CHANGE, just only triggered
			//when uploading data that corresponds to current document
			// and if not, we dont reset
			if (payload.newActiveDataSet) {
				return {
					...initialState,
					riverMakeUps: (payload.newActiveDataSet as ArchiveRiver).riverMakeUps,
					lastRiverIDNumber: (payload.newActiveDataSet as ArchiveRiver).lastRiverIDNumber,
				};
			} else {
				return state;
			}
		case t.RIVER_CONTENT_FILTER:
			return { ...state, contentFilter: payload };
		case t.ORIGIN_REQUEST:
			return { ...state, requestedOrigin: payload };
		default:
			return state;
	}
};

export default cardRiverState;
