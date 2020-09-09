import { NoteOrigin, QAOrigin } from "./model-origin";
import {
	NoteCardContent,
	QACardContent,
	noteContentIsEmpty,
	qaContentIsNotFull,
	strToCardContent,
	CardField,
} from "./model-content";

export type CardID = string;
export const cardIDToNumber = (cardID: CardID) => parseInt(cardID);
export const nextCardID = (lastCardIDNumber: number) => (lastCardIDNumber + 1).toString();

export type CardType = "Note" | "Q-A";
export type NoteConfig = { cardID: CardID; type: CardType; content: NoteCardContent; origin?: NoteOrigin };
export type QAConfig = { cardID: CardID; type: CardType; content: QACardContent; origin?: QAOrigin };
export type CardConfig = NoteConfig | QAConfig;

const CardIsFullMap: { [card in CardType]: (config: CardConfig) => boolean } = {
	Note: (config) => noteContentIsEmpty(config.content as NoteCardContent),
	"Q-A": (config) => qaContentIsNotFull(config.content as QACardContent),
};
export const cardIsNotFull = (config: CardConfig) => CardIsFullMap[config.type](config);

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "note" | "q" | "a";

export const strToCardConfig = (
	contentStr: string,
	outputField: CardField,
	updateType: UpdateType,
	baseCard: CardConfig
): CardConfig => {
	const changedContent = strToCardContent(contentStr, outputField, updateType, baseCard.content);
	return { ...baseCard, content: changedContent } as CardConfig;
};

const CardFieldToTypeMap: { [field in CardField]: CardType } = {
	q: "Q-A",
	a: "Q-A",
	note: "Note",
};

export const cardFieldToType = (field: CardField) => CardFieldToTypeMap[field];

export type CardFieldIdentifier = { cardID: CardID; cardField: CardField };
