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
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { SingleOrigin } from "../cards/model/origin";
import { simpleReducer } from "../../shared/utils";

const initialState: CardRiverState = {
	riverOriginRequest: null,
	riverMakeUps: {
		[pageNumberToRiverMakeUpID(1)]: {
			riverID: pageNumberToRiverMakeUpID(1),
			cardIDs: [],
		},
	},
	riverActiveID: pageNumberToRiverMakeUpID(1),
	riverShowState: "SHOW",
	riverContentState: "ALL",
	riverContentFilter: "",
	count_DONT_USE: 0,
};

const riverActiveID: CaseReducer<CardRiverState, PayloadAction<string>> = simpleReducer("riverActiveID");
const riverShowState: CaseReducer<CardRiverState, PayloadAction<RiverShowState>> = simpleReducer("riverShowState");
const riverContentState: CaseReducer<CardRiverState, PayloadAction<RiverContentState>> = simpleReducer(
	"riverContentState"
);
const riverContentFilter: CaseReducer<CardRiverState, PayloadAction<string>> = simpleReducer("riverContentFilter");
const riverOriginRequest: CaseReducer<CardRiverState, PayloadAction<SingleOrigin | null>> = simpleReducer(
	"riverOriginRequest"
);

const allRiversReset: CaseReducer<CardRiverState> = (_) => {
	return initialState;
};

const allRiversReplace: CaseReducer<CardRiverState, PayloadAction<RiverMakeUps>> = (_, { payload }) => {
	return {
		...initialState,
		riverMakeUps: payload as RiverMakeUps,
	};
};

const riverCardPush: CaseReducer<CardRiverState, PayloadAction<CardConfig>> = (state, { payload }) => {
	let riverMakeUp;
	let riverMakeUps;
	// make this unchained
	// then make clean up action?
	if (state.riverMakeUps[state.riverActiveID]) {
		riverMakeUp = {
			...state.riverMakeUps[state.riverActiveID],
			cardIDs: [...state.riverMakeUps[state.riverActiveID].cardIDs, (payload as CardConfig).cardID],
		};
	} else {
		// create new river
		riverMakeUp = {
			riverID: state.riverActiveID,
			cardIDs: [(payload as CardConfig).cardID],
		};
	}
	riverMakeUps = { ...state.riverMakeUps };
	riverMakeUps[state.riverActiveID] = riverMakeUp;

	return { ...state, riverMakeUps: riverMakeUps, count_DONT_USE: 0 };
};

const riverCardRemove: CaseReducer<CardRiverState, PayloadAction<string>> = (state, { payload }) => {
	return { ...removeCardFromRivers(state, payload), count_DONT_USE: 0 };
};

const riverCardReplace: CaseReducer<CardRiverState> = (state) => {
	// a new state is necessary for the undo/redo to be able to sync river and cards
	// by resetting this to 0 via the other card-action, we avoid a (unlikely) too high number
	return { ...state, count_DONT_USE: state.count_DONT_USE + 1 };
};

const riverSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		riverActiveID,
		riverShowState,
		riverContentState,
		riverContentFilter,
		riverOriginRequest,
		allRiversReset,
		allRiversReplace,
	},
	extraReducers: {
		[cards.actions.cardPush.type]: riverCardPush,
		[cards.actions.cardRemove.type]: riverCardRemove,
		[cards.actions.cardReplace.type]: riverCardReplace,
		[cards.actions.cardFieldReplace.type]: riverCardReplace,
	},
});

export const { actions } = riverSlice;

export default riverSlice;
