import { isNullOrUndefined } from "util";
import { QACardField } from "./model-content";

export type SingleOrigin = { spanIndex: number; page: number };
export type QOnlyQAOrigin = { q: SingleOrigin; a: {} };
export type AOnlyQAOrigin = { q: {}; a: SingleOrigin };
export type PartialQAOrigin = QOnlyQAOrigin | AOnlyQAOrigin;
export const partialQAOrigin = (inputOrigin: SingleOrigin, field: QACardField): PartialQAOrigin => {
	return { q: {}, a: {}, [field]: inputOrigin } as PartialQAOrigin;
};
export type FullQAOrigin = { q: SingleOrigin; a: SingleOrigin };
export const extractSingleOrigin = (inputOrigin: QAOrigin, field: QACardField): SingleOrigin => {
	// existence needs to be checked prior
	return (inputOrigin as FullQAOrigin)[field];
};
export const flipQACardField = (field: QACardField): QACardField => (field === "q" ? "a" : "q");
export const flipPartialQAOrigin = (
	inputOrigin: PartialQAOrigin,
	inputField: QACardField,
	outputField: QACardField
): PartialQAOrigin => {
	return { [inputField]: {}, [outputField]: inputOrigin[inputField] } as PartialQAOrigin;
};
export type QAOrigin = FullQAOrigin | PartialQAOrigin;
export const isQAOrigin = (inputOrigin: CardOrigin) => !isNullOrUndefined((inputOrigin as QAOrigin).q);
export type NoteOrigin = SingleOrigin;
export type CardOrigin = NoteOrigin | QAOrigin;
export const mergeSimilarCardOrigins = (inputOrigin: CardOrigin, oldOrigin: CardOrigin): CardOrigin => {
	return { ...oldOrigin, ...inputOrigin };
};
