import { CreateModify, changeCardObject, createReplace } from "./permutation";
import { NoteConfig, QAConfig, UpdateType } from "./config";

export type QACardField = "q" | "a";
export type CardField = "note" | QACardField;

export type StringCardContent = string;
export type NoteCardContent = StringCardContent;
export type QACardContent = {
	[field in QACardField]: StringCardContent;
};
export type CardContent = NoteCardContent | QACardContent;

type EmptyContent = { q: ""; a: "" } | "";
const emptyQAContent = (): EmptyContent => {
	return { q: "", a: "" };
};
const EmptyContentMap: { [field in CardField]: () => EmptyContent } = {
	q: emptyQAContent,
	a: emptyQAContent,
	note: () => "",
};
export const emptyContent = (field: CardField) => {
	return EmptyContentMap[field]();
};

export const noteContentIsEmpty = (content: string) => content === "";
export const qaContentIsNotFull = (content: QACardContent) =>
	(content as QACardContent).q === "" || (content as QACardContent).a === "";

const createAppendStr: CreateModify = (inputValue: string) => (oldValue: string) =>
	(oldValue + " " + inputValue).trim();
const UpdateTypeCreateModifyMap: { [updateType in UpdateType]: CreateModify } = {
	APPEND: createAppendStr,
	REPLACE: createReplace,
};
const updateTypeToCreateModify = (updateType: UpdateType) => UpdateTypeCreateModifyMap[updateType];

// noteObjects are a single value like the selectedString, so we use them as a field for convenience
const inputField: CardField = "note";

export const strToCardContent = (
	contentStr: string,
	outputField: CardField,
	updateType: UpdateType,
	existingContent: CardContent
): CardContent => {
	const changeSpec = {
		inputObject: contentStr,
		inputField,
		fieldToBeChanged: outputField,
		objectToBeChanged: existingContent,
		createModify: updateTypeToCreateModify(updateType),
	};
	return changeCardObject(changeSpec);
};

export const strToNewCardContent = (contentStr: string, outputField: CardField) => {
	// new is always empty and we replace the input in the empty shell
	const empty = emptyContent(outputField);
	return strToCardContent(contentStr, outputField, "REPLACE", empty);
};

export const noteContentContainsStringOrEmpty = (noteConfig: NoteConfig, str: string) =>
	noteConfig.content === "" || noteConfig.content.includes(str);

export const qaContentContainsStringOrEmpty = (qaConfig: QAConfig, str: string) =>
	qaConfig.content.a === "" ||
	qaConfig.content.q === "" ||
	qaConfig.content.a.includes(str) ||
	qaConfig.content.q.includes(str);
