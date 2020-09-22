import { CardField } from "./content";
import { createReplace, changeCardObject } from "./permutation";

export type SingleOrigin = { spanIndexStart: number; spanIndexEnd: number; page: number };
export type QOnlyQAOrigin = { q: SingleOrigin; a: {} };
export type AOnlyQAOrigin = { q: {}; a: SingleOrigin };
export type PartialQAOrigin = QOnlyQAOrigin | AOnlyQAOrigin;
const emptyQAOrigin = () => {
	return { q: {}, a: {} };
};
type EmptyOrigin = { q: {}; a: {} } | "";
const EmptyOriginMap: { [field in CardField]: () => EmptyOrigin } = {
	q: emptyQAOrigin,
	a: emptyQAOrigin,
	note: () => "",
};
export const emptyOrigin = (field: CardField) => {
	return EmptyOriginMap[field]();
};
type FullQAOrigin = { q: SingleOrigin; a: SingleOrigin };
export type QAOrigin = FullQAOrigin | PartialQAOrigin;
export type NoteOrigin = SingleOrigin;
export type CardOrigin = NoteOrigin | QAOrigin;

export const singleOriginToCardOrigin = (
	singleOrigin: SingleOrigin,
	outputField: CardField,
	baseOrigin?: CardOrigin
): CardOrigin => {
	const changeSpec = {
		inputObject: singleOrigin,
		inputField: "note" as CardField,
		fieldToBeChanged: outputField,
		objectToBeChanged: baseOrigin ? baseOrigin : emptyOrigin(outputField),
		createModify: createReplace,
	};

	return changeCardObject(changeSpec);
};
