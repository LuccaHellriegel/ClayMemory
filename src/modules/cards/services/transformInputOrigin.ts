import { CardField } from "../model/model-content";
import { CardOrigin, emptyOrigin } from "../model/model-origin";
import { changeCardObject, createReplace } from "../model/model-permutation";

export const transformInputOrigin = (
	inputOrigin: CardOrigin,
	inputField: CardField,
	outputField: CardField,
	oldOrigin?: CardOrigin
): CardOrigin => {
	const objectToBeChanged = oldOrigin ? oldOrigin : emptyOrigin(outputField);
	const changeSpec = {
		inputField,
		fieldToBeChanged: outputField,
		objectToBeChanged,
		inputObject: inputOrigin,
		createModify: createReplace,
	};
	return changeCardObject(changeSpec);
};
