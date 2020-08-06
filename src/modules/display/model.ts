import { RefObject } from "react";

export type DisplayStatus = "SHOW" | "HIDE";

export type DisplayData = {
	pdf?: File;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages?: number;
	documentRef: RefObject<HTMLDivElement>;
};

export type PageMove = "PREVIOUS" | "NEXT";
