import { SingleOrigin } from "../cards/model/origin";

export type PDFStatus = "SHOW" | "HIDE";

export type PDFState = {
	pdf?: File;
	pdfName?: string;
	pdfShowStatus: PDFStatus;
	currentPage: number;
	scrollToPage: number | null;
	totalPages: number;
	documentSearch: string | "";
	spanOrigin: SingleOrigin | null;
};
