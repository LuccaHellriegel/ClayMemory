"use strict";

import { CardField } from "./content";
import { UpdateType, CardType } from "./config";
import { CardPayload, cardFieldToEmptyPayload, strToCardPayload } from "./payload";
import { QAOrigin } from "./origin";

const contentStringToPayload = (
	contentStr: string,
	outputField: CardField,
	updateType: UpdateType,
	base?: CardPayload
) => {
	const baseCard = base ? base : cardFieldToEmptyPayload(outputField);
	return strToCardPayload(contentStr, outputField, updateType, baseCard);
};

test("output note correctly", () => {
	const contentString = "1";
	const expectedPayload = { type: "Note", content: "1" };

	expect(contentStringToPayload(contentString, "note", "REPLACE")).toEqual(expectedPayload);
	expect(contentStringToPayload(contentString, "note", "REPLACE", { type: "Note", content: "2" })).toEqual(
		expectedPayload
	);
	expect(contentStringToPayload(contentString, "note", "APPEND", { type: "Note", content: "2" })).toEqual({
		type: "Note",
		content: "2 1",
	});
});

test("output qa correctly", () => {
	const contentString = "1";

	const expectedQEmptyPayload = { type: "Q-A", content: { q: "1", a: "" } };
	expect(contentStringToPayload(contentString, "q", "REPLACE")).toEqual(expectedQEmptyPayload);

	const expectedAEmptyPayload = { type: "Q-A", content: { q: "", a: "1" } };
	expect(contentStringToPayload(contentString, "a", "REPLACE")).toEqual(expectedAEmptyPayload);

	const expectedQPayload = { type: "Q-A" as CardType, content: { q: "1", a: "test" } };
	expect(
		contentStringToPayload(contentString, "q", "REPLACE", {
			type: "Q-A" as CardType,
			content: { q: "not one", a: "test" },
		})
	).toEqual(expectedQPayload);

	const expectedAPayload = { type: "Q-A" as CardType, content: { q: "test too", a: "1" } };
	expect(
		contentStringToPayload(contentString, "a", "REPLACE", {
			type: "Q-A" as CardType,
			content: { q: "test too", a: "really not one" },
		})
	).toEqual(expectedAPayload);

	const expectedAPayloadWithOrigin = {
		type: "Q-A" as CardType,
		content: { q: "test too", a: "1" },
		origin: {
			a: { spanIndexStart: 1, spanIndexEnd: 1, page: 3 },
			q: { spanIndexStart: 51, spanIndexEnd: 51, page: 300 },
		} as QAOrigin,
	};
	expect(
		contentStringToPayload(contentString, "a", "REPLACE", {
			type: "Q-A" as CardType,
			content: { q: "test too", a: "really not one" },
			origin: {
				a: { spanIndexStart: 1, spanIndexEnd: 1, page: 3 },
				q: { spanIndexStart: 51, spanIndexEnd: 51, page: 300 },
			} as QAOrigin,
		})
	).toEqual(expectedAPayloadWithOrigin);
});
