import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { simpleReducer } from "../../shared/utils";
import cards from "../cards";
import { CardID } from "../cards/model/config";
import { NAME } from "./constants";
import {
	SelectionData,
	SelectionTargetConfig,
	SelectionSourceConfig,
	SelectionExistingCardTargetConfig,
} from "./model";

const initialState: SelectionData = {
	sourceConfig: null,
	targetConfig: null,
};

const selectionSource: CaseReducer<SelectionData, PayloadAction<SelectionSourceConfig | null>> = simpleReducer(
	"sourceConfig"
);
const selectionTarget: CaseReducer<SelectionData, PayloadAction<SelectionTargetConfig | null>> = simpleReducer(
	"targetConfig"
);

const removeTarget: CaseReducer<SelectionData, PayloadAction<CardID>> = (state, { payload }) => {
	return {
		...state,
		targetConfig:
			(state.targetConfig as SelectionExistingCardTargetConfig).cardID &&
			(state.targetConfig as SelectionExistingCardTargetConfig).cardID === payload
				? null
				: state.targetConfig,
	};
};

const selectionSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		selectionSource,
		selectionTarget,
	},
	extraReducers: {
		[cards.actions.cardRemove.type]: removeTarget,
	},
});

export const { actions } = selectionSlice;

export default selectionSlice;
