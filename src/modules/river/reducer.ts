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
	count_DONT_USE: 0,
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
		case t.RIVER_RESET:
			return initialState;
		case t.RIVER_REPLACE:
			return {
				...initialState,
				riverMakeUps: payload as RiverMakeUps,
			};
		case cards.actions.cardPush.type:
			// make this unchained
			// then make clean up action?
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

			return { ...state, riverMakeUps: riverMakeUps, count_DONT_USE: 0 };
		case cards.actions.cardRemove.type:
			return { ...removeCardFromRivers(state, payload as string), count_DONT_USE: 0 };
		case cards.actions.cardReplace.type:
			// a new state is necessary for the undo/redo to be able to sync river and cards
			// by resetting this to 0 via the other card-action, we avoid a (unlikely) too high number
			return { ...state, count_DONT_USE: state.count_DONT_USE + 1 };
		case cards.actions.cardFieldReplace.type:
			// a new state is necessary for the undo/redo to be able to sync river and cards
			// by resetting this to 0 via the other card-action, we avoid a (unlikely) too high number
			return { ...state, count_DONT_USE: state.count_DONT_USE + 1 };
		default:
			return state;
	}
};

export default cardRiverState;
