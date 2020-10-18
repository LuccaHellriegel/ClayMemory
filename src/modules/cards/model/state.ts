import { CardConfig } from "./config";

export type Cards = { [cardID: string]: CardConfig };

export type CardsState = {
	cards: Cards;
	lastCardIDNumber: number;
};
