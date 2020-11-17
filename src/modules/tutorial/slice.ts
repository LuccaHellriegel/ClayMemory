import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { simpleReducer } from "../../shared/utils";
import { NAME } from "./constants";
import { TutorialState } from "./model";

const initialState: TutorialState = { step: 1 };

const step: CaseReducer<TutorialState, PayloadAction<number | null>> = simpleReducer("step");

const selectionSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		step,
	},
});

export const { actions } = selectionSlice;

export default selectionSlice;
