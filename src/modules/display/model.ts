import { RefObject } from "react";

export type DisplayStatus = "SHOW" | "HIDE";

export type DisplayData = {
	pdf?: File;
	pdfName?: string;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages: number;
	documentRef: RefObject<HTMLDivElement>;
	zoomTargetSpanIndex: number | null;
};

export type PageMove = "PREVIOUS" | "NEXT";

export const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};
