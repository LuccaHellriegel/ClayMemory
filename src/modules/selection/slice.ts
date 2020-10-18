import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { SelectionData, SelectionGoalConfig, SelectionSourceConfig } from "./model";

const initialState: SelectionData = {
	sourceConfig: null,
	goalConfig: null,
};

const selectionSource: CaseReducer<SelectionData, PayloadAction<SelectionSourceConfig | null>> = (
	state,
	{ payload }
) => {
	return { ...state, sourceConfig: payload };
};

const selectionGoal: CaseReducer<SelectionData, PayloadAction<SelectionGoalConfig | null>> = (state, { payload }) => {
	return { ...state, goalConfig: payload };
};

const selectionSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		selectionSource,
		selectionGoal,
	},
});

export const { actions } = selectionSlice;

export default selectionSlice;
