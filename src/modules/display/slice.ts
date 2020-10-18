import { DisplayData, DisplayStatus, pageCorrections, View } from "./model";
import { simpleReducer } from "../../shared/utils";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { SingleOrigin } from "../cards/model/origin";

const initialState: DisplayData = {
	displayStatus: "SHOW",
	totalPages: 1000,
	currentPage: 1,
	scrollToPage: null,
	windowMeasurements: null,
	spanOrigin: null,
	documentSearch: "",
	topOffset: 0,
	currentView: View.RiverMaterial,
};

const pdfUpload: CaseReducer<DisplayData, PayloadAction<File>> = simpleReducer("pdf");
const totalPages: CaseReducer<DisplayData, PayloadAction<number>> = simpleReducer("totalPages");
const displayStatus: CaseReducer<DisplayData, PayloadAction<DisplayStatus>> = simpleReducer("displayStatus");
const spanOrigin: CaseReducer<DisplayData, PayloadAction<SingleOrigin | null>> = simpleReducer("spanOrigin");
const documentSearch: CaseReducer<DisplayData, PayloadAction<string>> = simpleReducer("documentSearch");
const topOffset: CaseReducer<DisplayData, PayloadAction<number>> = simpleReducer("topOffset");
const windowMeasurements: CaseReducer<
	DisplayData,
	PayloadAction<{ width: number; height: number } | null>
> = simpleReducer("windowMeasurements");
const currentView: CaseReducer<DisplayData, PayloadAction<View>> = simpleReducer("currentView");

const pageUpdate: CaseReducer<DisplayData, PayloadAction<{ page: number; shouldScroll: boolean }>> = (
	state,
	{ payload }
) => {
	return { ...state, currentPage: payload.page, scrollToPage: payload.shouldScroll ? payload.page : null };
};
const nextPage: CaseReducer<DisplayData> = (state) => {
	const page = pageCorrections["ADD"](state.currentPage + 1, state.totalPages);
	return { ...state, currentPage: page, scrollToPage: page };
};
const previousPage: CaseReducer<DisplayData> = (state) => {
	const page = pageCorrections["REMOVE"](state.currentPage - 1, state.totalPages);
	return { ...state, currentPage: page, scrollToPage: page };
};

type ExistingDocumentPayload = Pick<DisplayData, "currentPage" | "totalPages">;
const existingDocumentPayload: CaseReducer<DisplayData, PayloadAction<ExistingDocumentPayload>> = (_, { payload }) => {
	return {
		...initialState,
		pdf: undefined,
		...(payload as ExistingDocumentPayload),
	};
};

const displaySlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		pdfUpload,
		totalPages,
		displayStatus,
		spanOrigin,
		documentSearch,
		topOffset,
		windowMeasurements,
		currentView,
		pageUpdate,
		nextPage,
		previousPage,
		existingDocumentPayload,
	},
});

export const { actions } = displaySlice;

export default displaySlice;
