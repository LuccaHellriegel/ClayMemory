export type DisplayStatus = "NONE" | "RENDERED";

export type DisplayData = {
	pdf?: File;
	displayStatus: DisplayStatus;
	currentPage: number;
	totalPages?: number;
};

export type PageUpdate = "PREVIOUS" | "NEXT" | "SET";
