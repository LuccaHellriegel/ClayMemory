import { CardField, strToCardContent } from "./content";
import { getLastCardIDNumber } from "../selectors";
import { CardConfig, nextCardID, UpdateType } from "./config";
import { CardsState } from "./state";

export type CardPayload = Omit<CardConfig, "cardID">;
export const emptyNotePayload = (): CardPayload => {
	return { type: "Note", content: "" };
};
export const emptyQAPayload = (): CardPayload => {
	return { type: "Q-A", content: { q: "", a: "" } };
};

export const strToCardPayload = (
	contentStr: string,
	outputField: CardField,
	updateType: UpdateType,
	baseCard: CardPayload
): CardPayload => {
	const changedContent = strToCardContent(contentStr, outputField, updateType, baseCard.content);
	return { ...baseCard, content: changedContent };
};

const EmptyPayloadFieldMap: {
	[key in CardField]: () => CardPayload;
} = {
	note: emptyNotePayload,
	q: emptyQAPayload,
	a: emptyQAPayload,
};
export const cardFieldToEmptyPayload = (field: CardField) => EmptyPayloadFieldMap[field]();

export const cardPayloadToCardConfig = (payload: CardPayload, state: CardsState) => {
	return { ...payload, cardID: nextCardID(getLastCardIDNumber(state)) } as CardConfig;
};
