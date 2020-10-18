import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { simpleReducer } from "../../shared/utils";
import { NAME } from "./constants";
import { SelectionData, SelectionGoalConfig, SelectionSourceConfig } from "./model";

const initialState: SelectionData = {
	sourceConfig: null,
	goalConfig: null,
};

const selectionSource: CaseReducer<SelectionData, PayloadAction<SelectionSourceConfig | null>> = simpleReducer(
	"sourceConfig"
);
const selectionGoal: CaseReducer<SelectionData, PayloadAction<SelectionGoalConfig | null>> = simpleReducer(
	"goalConfig"
);

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
