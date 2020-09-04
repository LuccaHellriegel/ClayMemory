import { RefObject } from "react";

export type MaterialGroupData = {
	materialSpans: HTMLSpanElement[];
	materialBoundingRects: DOMRect[];
};

export type MaterialData =
	| {
			materialDataTimeStamp: number;
	  }
	| ({
			materialDataTimeStamp: number;
	  } & MaterialGroupData);

export type DisplayStatus = "SHOW" | "HIDE";

//the number is the arr position and not the actual count of spans
export type PerPageSpans = { [page: number]: number };

export type DisplayData = {
	pdf?: File;
	pdfName?: string;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages: number;
	//TODO-NICE:might need amount of spans per page for validation? if yes, use this
	pageSpans: PerPageSpans;
	documentRef: RefObject<HTMLDivElement>;
	zoomTargetSpanIndex: number | null;
	materialData: MaterialData;
	materialHeight?: number;
};

export type PageMove = "PREVIOUS" | "NEXT";

export const pageCorrections = {
	ADD: (newPage: number, totalPages: number) => (newPage === totalPages + 1 ? 1 : newPage),
	REMOVE: (newPage: number, totalPages: number) => (newPage === 0 ? totalPages : newPage),
};
