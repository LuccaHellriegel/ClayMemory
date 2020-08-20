import { CardField, QACardField } from "../model/model-content";
import {
	CardOrigin,
	QAOrigin,
	PartialQAOrigin,
	partialQAOrigin,
	extractSingleOrigin,
	SingleOrigin,
	flipPartialQAOrigin,
	mergeSimilarCardOrigins,
	isQAOrigin,
} from "../model/model-origin";

//TODO-NICE: make this non-redundant, but for now it works

export const transformInputOrigin = (
	inputOrigin: CardOrigin,
	inputField: CardField,
	outputField: CardField,
	oldOrigin?: CardOrigin
): CardOrigin => {
	if (!oldOrigin) {
		if (inputField === outputField) return inputOrigin;

		if (inputField === "note") {
			return partialQAOrigin(inputOrigin as SingleOrigin, outputField as QACardField);
		}

		if (outputField === "note") {
			return extractSingleOrigin(inputOrigin as QAOrigin, inputField as QACardField);
		}

		return flipPartialQAOrigin(inputOrigin as PartialQAOrigin, inputField, outputField);
	} else {
		if (inputField === outputField) return mergeSimilarCardOrigins(inputOrigin, oldOrigin);

		if (inputField === "note" && isQAOrigin(oldOrigin)) {
			// this means SingleOrigin to QAOrigin
			return { ...oldOrigin, [outputField]: inputOrigin };
		}

		if (outputField === "note") {
			return extractSingleOrigin(inputOrigin as QAOrigin, inputField as QACardField);
		}

		// swap cases
		if (outputField === "q") {
			return { q: (inputOrigin as QAOrigin).a, a: (oldOrigin as QAOrigin).a } as QAOrigin;
		} else {
			//A
			return { a: (inputOrigin as QAOrigin).q, q: (oldOrigin as QAOrigin).q } as QAOrigin;
		}
	}
};
