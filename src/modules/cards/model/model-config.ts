import { NoteOrigin, QAOrigin, SingleOrigin, emptyOrigin } from "./model-origin";
import {
	NoteCardContent,
	QACardContent,
	noteContentIsEmpty,
	qaContentIsNotFull,
	strToCardContent,
	CardField,
} from "./model-content";
import { createReplace, changeCardObject } from "./model-permutation";

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

export const originToCardConfig = (
	singleOrigin: SingleOrigin,
	outputField: CardField,
	baseCard: CardConfig
): CardConfig => {
	const changeSpec = {
		inputObject: singleOrigin,
		inputField: "note" as CardField,
		fieldToBeChanged: outputField,
		objectToBeChanged: baseCard.origin ? baseCard.origin : emptyOrigin(outputField),
		createModify: createReplace,
	};

	const changedOrigin = changeCardObject(changeSpec);
	return { ...baseCard, origin: changedOrigin } as CardConfig;
};
