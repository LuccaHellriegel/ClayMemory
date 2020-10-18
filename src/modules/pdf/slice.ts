import { simpleReducer } from "../../shared/utils";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { SingleOrigin } from "../cards/model/origin";
import { PDFState, PDFStatus } from "./model";

const initialState: PDFState = {
	pdfShowStatus: "SHOW",
	totalPages: 1000,
	currentPage: 1,
	scrollToPage: null,
	spanOrigin: null,
	documentSearch: "",
};

const pdfUpload: CaseReducer<PDFState, PayloadAction<File>> = simpleReducer("pdf");
const totalPages: CaseReducer<PDFState, PayloadAction<number>> = simpleReducer("totalPages");
const pdfShowStatus: CaseReducer<PDFState, PayloadAction<PDFStatus>> = simpleReducer("pdfShowStatus");
const spanOrigin: CaseReducer<PDFState, PayloadAction<SingleOrigin | null>> = simpleReducer("spanOrigin");
const documentSearch: CaseReducer<PDFState, PayloadAction<string>> = simpleReducer("documentSearch");

const pageUpdate: CaseReducer<PDFState, PayloadAction<{ page: number; shouldScroll: boolean }>> = (
	state,
	{ payload }
) => {
	return { ...state, currentPage: payload.page, scrollToPage: payload.shouldScroll ? payload.page : null };
};

const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};

const nextPage: CaseReducer<PDFState> = (state) => {
	const page = pageCorrections["ADD"](state.currentPage + 1, state.totalPages);
	return { ...state, currentPage: page, scrollToPage: page };
};
const previousPage: CaseReducer<PDFState> = (state) => {
	const page = pageCorrections["REMOVE"](state.currentPage - 1, state.totalPages);
	return { ...state, currentPage: page, scrollToPage: page };
};

type ExistingDocumentPayload = Pick<PDFState, "currentPage" | "totalPages">;
const existingDocumentPayload: CaseReducer<PDFState, PayloadAction<ExistingDocumentPayload>> = (_, { payload }) => {
	return {
		...initialState,
		pdf: undefined,
		...(payload as ExistingDocumentPayload),
	};
};

const pdfSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		pdfUpload,
		totalPages,
		pdfShowStatus,
		spanOrigin,
		documentSearch,
		pageUpdate,
		nextPage,
		previousPage,
		existingDocumentPayload,
	},
});

export const { actions } = pdfSlice;

export default pdfSlice;
