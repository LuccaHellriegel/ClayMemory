import { CreateModify, changeCardObject, createReplace } from "./permutation";
import { UpdateType } from "./config";

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

const createAppendStr: CreateModify = (inputValue: string) => (oldValue: string) => oldValue + inputValue;
const UpdateTypeCreateModifyMap: { [updateType in UpdateType]: CreateModify } = {
	APPEND: createAppendStr,
	REPLACE: createReplace,
};
const updateTypeToCreateModify = (updateType: UpdateType) => UpdateTypeCreateModifyMap[updateType];

// noteObjects are a single value like the selectedString, so we use them as a field for convenience
// TODO-NICE: make single value generic CardObject definition
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
