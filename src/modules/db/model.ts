import { CardRiverState } from "../river/model";
import { CardsState } from "../cards/model/state";
import { PDFState } from "../pdf/model";

export type ArchiveRiver = Pick<CardRiverState, "riverMakeUps">;

type ArchivePDF = Pick<PDFState, "currentPage" | "totalPages">;

export type DocumentData = {
	name: string;
} & ArchivePDF &
	ArchiveRiver &
	CardsState;

export type DocumentDB = { [name: string]: DocumentData };
