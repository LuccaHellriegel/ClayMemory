import { CardField, QACardField } from "./model-content";

// for origin and content the same object structure is used,
// so same permutation api should be used

type NoteObject = any;
type QAObject = { [key in QACardField]: any };
type CardObject = NoteObject | QAObject;

const FieldValueAccessorMap: { [field in CardField]: (cardObject: CardObject) => any } = {
	note: (cardObject) => cardObject,
	q: (cardObject) => (cardObject as QAObject).q,
	a: (cardObject) => (cardObject as QAObject).a,
};
export const toFieldValue = (field: CardField, cardObject: CardObject) => FieldValueAccessorMap[field](cardObject);

type Modify = (oldValue: any) => any;
const FieldValueModifierMap: { [key in CardField]: (cardObject: CardObject, modify: Modify) => any } = {
	note: (cardObject, modify) => modify(cardObject),
	q: (cardObject, modify) => {
		return { ...(cardObject as QAObject), q: modify((cardObject as QAObject).q) };
	},
	a: (cardObject, modify) => {
		return { ...(cardObject as QAObject), a: modify((cardObject as QAObject).a) };
	},
};
const modifyFieldValue = (field: CardField, cardObject: CardObject, modify: Modify) =>
	FieldValueModifierMap[field](cardObject, modify);

export type CreateModify = (inputValue: any) => Modify;

// this replace is generic, I dont put append here, because that is object specific
export const createReplace: CreateModify = (inputValue: any) => (_: any) => inputValue;

export type CardObjectChangeSpec = {
	inputField: CardField;
	inputObject: CardObject;
	fieldToBeChanged: CardField;
	objectToBeChanged: CardObject;
	createModify: CreateModify;
};
export const changeCardObject = (spec: CardObjectChangeSpec) => {
	const inputValue = toFieldValue(spec.inputField, spec.inputObject);
	const modify = spec.createModify(inputValue);
	return modifyFieldValue(spec.fieldToBeChanged, spec.objectToBeChanged, modify);
};
