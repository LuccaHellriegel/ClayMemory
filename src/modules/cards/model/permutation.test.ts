"use strict";

import { changeCardObject, CardObjectChangeSpec, createReplace } from "./permutation";
import { CardField } from "./content";

test("note input: replace note correctly", () => {
	const note = "1";
	const baseSpec = { objectToBeChanged: note, createModify: createReplace };

	const noteBase: { inputField: CardField; inputObject: any } = { inputField: "note", inputObject: 3 };

	const changeSpecNote: CardObjectChangeSpec = {
		...noteBase,
		fieldToBeChanged: "note",
		...baseSpec,
	};
	const expectedNote = 3;
	expect(changeCardObject(changeSpecNote)).toEqual(expectedNote);
});

test("note input: replace QA correctly", () => {
	const qa = { a: "1", q: 2 };
	const baseSpec = { objectToBeChanged: qa, createModify: createReplace };

	const noteBase: { inputField: CardField; inputObject: any } = { inputField: "note", inputObject: 3 };

	const changeSpecNoteA: CardObjectChangeSpec = {
		...noteBase,
		fieldToBeChanged: "a",
		...baseSpec,
	};
	const expectedNoteA = { a: 3, q: 2 };
	expect(changeCardObject(changeSpecNoteA)).toEqual(expectedNoteA);

	const changeSpecNoteQ: CardObjectChangeSpec = {
		...noteBase,
		fieldToBeChanged: "q",
		...baseSpec,
	};
	const expectedNoteQ = { a: "1", q: 3 };
	expect(changeCardObject(changeSpecNoteQ)).toEqual(expectedNoteQ);
});

test("qa input: replace QA correctly", () => {
	const qa = { a: "1", q: 2 };
	const baseSpec = { objectToBeChanged: qa, createModify: createReplace };

	const inputBase = { inputObject: { q: 123, a: "test" } };

	const changeSpecQA_A_A: CardObjectChangeSpec = {
		...inputBase,
		inputField: "a",
		fieldToBeChanged: "a",
		...baseSpec,
	};
	const expectedQA_A_A = { a: "test", q: 2 };
	expect(changeCardObject(changeSpecQA_A_A)).toEqual(expectedQA_A_A);

	const changeSpecQA_Q_A: CardObjectChangeSpec = {
		...inputBase,
		inputField: "q",
		fieldToBeChanged: "a",
		...baseSpec,
	};
	const expectedQA_Q_A = { a: 123, q: 2 };
	expect(changeCardObject(changeSpecQA_Q_A)).toEqual(expectedQA_Q_A);

	const changeSpecQA_A_Q: CardObjectChangeSpec = {
		...inputBase,
		inputField: "a",
		fieldToBeChanged: "q",
		...baseSpec,
	};
	const expectedQA_A_Q = { a: "1", q: "test" };
	expect(changeCardObject(changeSpecQA_A_Q)).toEqual(expectedQA_A_Q);

	const changeSpecQA_Q_Q: CardObjectChangeSpec = {
		...inputBase,
		inputField: "q",
		fieldToBeChanged: "q",
		...baseSpec,
	};
	const expectedQA_Q_Q = { a: "1", q: 123 };
	expect(changeCardObject(changeSpecQA_Q_Q)).toEqual(expectedQA_Q_Q);
});

test("qa input: replace note correctly", () => {
	const note = 2;
	const baseSpec: { fieldToBeChanged: CardField; objectToBeChanged: any; createModify: any } = {
		fieldToBeChanged: "note",
		objectToBeChanged: note,
		createModify: createReplace,
	};

	const qaBase = { inputObject: { a: "1", q: 2 } };

	const changeSpecNoteA: CardObjectChangeSpec = {
		...qaBase,
		inputField: "a",
		...baseSpec,
	};
	const expectedNoteA = "1";
	expect(changeCardObject(changeSpecNoteA)).toEqual(expectedNoteA);

	const changeSpecNoteQ: CardObjectChangeSpec = {
		...qaBase,
		inputField: "q",
		...baseSpec,
	};
	const expectedNoteQ = 2;
	expect(changeCardObject(changeSpecNoteQ)).toEqual(expectedNoteQ);
});
