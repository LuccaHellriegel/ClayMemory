import {
	CardRiverState,
	RiverShowState,
	pageNumberToRiverMakeUpID,
	RiverContentState,
	removeCardFromRivers,
	RiverMakeUps,
} from "./model";
import { CardConfig } from "../cards/model/config";
import cards from "../cards";
import * as t from "./actionTypes";
import { ArchiveRiver } from "../db/model";
import db from "../db";
import { ClayMemoryPayloadAction } from "../../shared/utils";

const initialState: CardRiverState = {
	requestedOrigin: null,
	riverMakeUps: {
		[pageNumberToRiverMakeUpID(1)]: {
			riverID: pageNumberToRiverMakeUpID(1),
			cardIDs: [],
		},
	},
	activeRiverMakeUpID: pageNumberToRiverMakeUpID(1),
	riverShowState: "SHOW",
	riverContentState: "ALL",
	contentFilter: "",
};

const cardRiverState = (state = initialState, { type, payload }: ClayMemoryPayloadAction): CardRiverState => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case t.RIVER_ACTIVE_ID:
			return { ...state, activeRiverMakeUpID: payload };
		case t.RIVER_SHOW_STATE:
			return { ...state, riverShowState: payload as RiverShowState };
		case t.RIVER_CONTENT_STATE:
			return { ...state, riverContentState: payload as RiverContentState };
		case t.RIVER_CONTENT_FILTER:
			return { ...state, contentFilter: payload };
		case t.ORIGIN_REQUEST:
			return { ...state, requestedOrigin: payload };
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

		case t.RIVER_RESET:
			return initialState;
		case t.RIVER_REPLACE:
			return {
				...initialState,
				riverMakeUps: payload as RiverMakeUps,
			};

		case db.actionTypes.LOAD_DOCUMENT_DATA_SETS:
			// basically the same as DOCUMENT_CHANGE, just only triggered
			//when uploading data that corresponds to current document
			// and if not, we dont reset
			if (payload.newActiveDataSet) {
				return {
					...initialState,
					riverMakeUps: (payload.newActiveDataSet as ArchiveRiver).riverMakeUps,
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};

export default cardRiverState;
