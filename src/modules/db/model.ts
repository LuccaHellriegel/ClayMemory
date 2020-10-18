import { CardRiverState } from "../river/model";
import { CardsState } from "../cards/model/state";
import { DisplayData } from "../display/model";

export type ArchiveRiver = Pick<CardRiverState, "riverMakeUps">;

type ArchiveDisplay = Pick<DisplayData, "currentPage" | "totalPages">;

export type DocumentData = {
	name: string;
} & ArchiveDisplay &
	ArchiveRiver &
	CardsState;

export type DocumentDB = { [name: string]: DocumentData };
