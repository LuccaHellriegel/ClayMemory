import { CardOrigin, QAOrigin, CardField } from "../model";
import { isNullOrUndefined } from "util";

//TODO-NICE: make this non-redundant, but for now it works

export const transformInputOrigin = (
	inputOrigin: CardOrigin,
	inputField: CardField,
	outputField: CardField,
	outputOrigin?: CardOrigin
) => {
	if (!outputOrigin) {
		if (inputField === outputField) return inputOrigin;

		if (inputField === "NOTE") {
			// this means SingleOrigin
			return { q: {}, a: {}, [outputField === "Q" ? "q" : "a"]: inputOrigin };
		}

		if (outputField === "NOTE") {
			//this means we need to transfrom QAOrigin to SingleOrigin
			return { ...(inputOrigin as QAOrigin)[inputField === "Q" ? "q" : "a"] };
		}

		// swap cases
		if (outputField === "Q") {
			return { q: (inputOrigin as QAOrigin).a, a: {} };
		} else {
			//A
			return { a: (inputOrigin as QAOrigin).q, q: {} };
		}
	} else {
		if (inputField === outputField) return { ...outputOrigin, ...inputOrigin };

		if (inputField === "NOTE" && !isNullOrUndefined((outputOrigin as QAOrigin).q)) {
			// this means SingleOrigin to QAOrigin
			return { ...outputOrigin, [outputField === "Q" ? "q" : "a"]: inputOrigin };
		}

		if (outputField === "NOTE") {
			//this means we need to transfrom QAOrigin to SingleOrigin
			return { ...(inputOrigin as QAOrigin)[inputField === "Q" ? "q" : "a"] };
		}

		// swap cases
		if (outputField === "Q") {
			return { q: (inputOrigin as QAOrigin).a, a: (outputOrigin as QAOrigin).a };
		} else {
			//A
			return { a: (inputOrigin as QAOrigin).q, q: (outputOrigin as QAOrigin).q };
		}
	}
};
