import { RefObject } from "react";

export type DisplayStatus = "NONE" | "RENDERED";

export type DisplayData = {
	pdf?: File;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages?: number;
	documentRef: RefObject<HTMLDivElement>;
};

export type PageMove = "PREVIOUS" | "NEXT";
