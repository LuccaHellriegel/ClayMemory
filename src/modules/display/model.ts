import { SingleOrigin } from "../cards/model/origin";

export type DisplayStatus = "SHOW" | "HIDE";

export enum View {
	RiverMaterial,
	RiverExplorer,
	CardExplorer,
}

export type DisplayData = {
	pdf?: File;
	displayStatus: DisplayStatus;
	currentPage: number;
	scrollToPage: number | null;
	totalPages: number;
	spanOrigin: SingleOrigin | null;
	windowMeasurements: { width: number; height: number } | null;
	topOffset: number;
	documentSearch: string | "";
	currentView: View;
};

export type PageMove = "PREVIOUS" | "NEXT";

export const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};
