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
type PerPageSpans = { [page: number]: number };

export type DisplayData = {
	pdf?: File;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages?: number;
	pageSpans: PerPageSpans;
	documentRef: RefObject<HTMLDivElement>;
	zoomQueue: number | null;
	materialData: MaterialData;
};

export type PageMove = "PREVIOUS" | "NEXT";
