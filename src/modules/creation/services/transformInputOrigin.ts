import { CreationType, CardOrigin, QAOrigin } from "../../cards/model";
import { isNullOrUndefined } from "util";

//TODO-NICE: make this non-redundant, but for now it works

export const transformInputOrigin = (
	sourceOrigin: CardOrigin,
	sourceField: CreationType,
	creationType: CreationType,
	goalOrigin?: CardOrigin
) => {
	if (!goalOrigin) {
		if (sourceField === creationType) return sourceOrigin;

		if (sourceField === "NOTE") {
			// this means SingleOrigin
			return { q: {}, a: {}, [creationType === "Q" ? "q" : "a"]: sourceOrigin };
		}

		if (creationType === "NOTE") {
			//this means we need to transfrom QAOrigin to SingleOrigin
			return { ...(sourceOrigin as QAOrigin)[sourceField === "Q" ? "q" : "a"] };
		}

		// swap cases
		if (creationType === "Q") {
			return { q: (sourceOrigin as QAOrigin).a, a: {} };
		} else {
			//A
			return { a: (sourceOrigin as QAOrigin).q, q: {} };
		}
	} else {
		if (sourceField === creationType) return { ...goalOrigin, ...sourceOrigin };

		if (sourceField === "NOTE" && !isNullOrUndefined((goalOrigin as QAOrigin).q)) {
			// this means SingleOrigin to QAOrigin
			return { ...goalOrigin, [creationType === "Q" ? "q" : "a"]: sourceOrigin };
		}

		if (creationType === "NOTE") {
			//this means we need to transfrom QAOrigin to SingleOrigin
			return { ...(sourceOrigin as QAOrigin)[sourceField === "Q" ? "q" : "a"] };
		}

		// swap cases
		if (creationType === "Q") {
			return { q: (sourceOrigin as QAOrigin).a, a: (goalOrigin as QAOrigin).a };
		} else {
			//A
			return { a: (sourceOrigin as QAOrigin).q, q: (goalOrigin as QAOrigin).q };
		}
	}
};
