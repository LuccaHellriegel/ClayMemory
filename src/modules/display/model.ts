import { SingleOrigin } from "../cards/model/model-origin";

export type DisplayStatus = "SHOW" | "HIDE";

export type DisplayData = {
	pdf?: File;
	pdfName?: string;
	displayStatus: DisplayStatus;
	currentPage: number;
	scrollToPage: number | null;
	totalPages: number;
	spanOrigin: SingleOrigin | null;
	windowMeasurements: { width: number; height: number } | null;
};

export type PageMove = "PREVIOUS" | "NEXT";

export const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};
