"use strict";

import { updateSelectionGroup } from "./updateSelectionGroup";

test("MINUS_WORD removes a word at the front", () => {
	// 1 group with 4 lines/spans with 10 words
	const everythingSelected = new Array(4).fill(0).map((_) => new Array(10).fill(1));

	const expected = new Array(4).fill(0).map((_) => new Array(10).fill(1));
	expected[0][0] = 0;

	const actual = updateSelectionGroup(everythingSelected, "MINUS_WORD");

	expect(actual === null).toBe(false);

	// no change in length
	expect((actual as (0 | 1)[][]).length).toBe(everythingSelected.length);

	for (let index = 0; index < everythingSelected.length; index++) {
		for (let wordIndex = 0; wordIndex < everythingSelected[0].length; wordIndex++) {
			expect((actual as (0 | 1)[][])[index][wordIndex]).toBe(expected[index][wordIndex]);
		}
	}
});

test("PLUS_WORD adds a word at the front", () => {
	// 1 group with 4 lines/spans with 10 words
	const everythingSelectedExeceptFirst = new Array(4).fill(0).map((_) => new Array(10).fill(1));
	everythingSelectedExeceptFirst[0][0] = 0;

	const expected = new Array(4).fill(0).map((_) => new Array(10).fill(1));

	const actual = updateSelectionGroup(everythingSelectedExeceptFirst, "PLUS_WORD");

	expect(actual === null).toBe(false);

	// no change in length
	expect((actual as (0 | 1)[][]).length).toBe(everythingSelectedExeceptFirst.length);

	for (let index = 0; index < everythingSelectedExeceptFirst.length; index++) {
		for (let wordIndex = 0; wordIndex < everythingSelectedExeceptFirst[0].length; wordIndex++) {
			expect((actual as (0 | 1)[][])[index][wordIndex]).toBe(expected[index][wordIndex]);
		}
	}
});

test("MINUS_SPAN removes a span/line at the front", () => {
	// 1 group with 4 lines/spans with 10 words
	const everythingSelected = new Array(4).fill(0).map((_) => new Array(10).fill(1));

	const expected = new Array(4)
		.fill(0)
		.map((_, index) => (index === 0 ? new Array(10).fill(0) : new Array(10).fill(1)));

	const actual = updateSelectionGroup(everythingSelected, "MINUS_SPAN");

	expect(actual === null).toBe(false);

	// no change in length
	expect((actual as (0 | 1)[][]).length).toBe(everythingSelected.length);

	for (let index = 0; index < everythingSelected.length; index++) {
		for (let wordIndex = 0; wordIndex < everythingSelected[0].length; wordIndex++) {
			expect((actual as (0 | 1)[][])[index][wordIndex]).toBe(expected[index][wordIndex]);
		}
	}
});

test("PLUS_SPAN adds a span/line at the front", () => {
	// 1 group with 4 lines/spans with 10 words
	const everythingSelectedExeceptFirstLine = new Array(4)
		.fill(0)
		.map((_, index) => (index === 0 ? new Array(10).fill(0) : new Array(10).fill(1)));

	const expected = new Array(4).fill(0).map((_) => new Array(10).fill(1));

	const actual = updateSelectionGroup(everythingSelectedExeceptFirstLine, "PLUS_SPAN");

	expect(actual === null).toBe(false);

	// no change in length
	expect((actual as (0 | 1)[][]).length).toBe(everythingSelectedExeceptFirstLine.length);

	for (let index = 0; index < everythingSelectedExeceptFirstLine.length; index++) {
		for (let wordIndex = 0; wordIndex < everythingSelectedExeceptFirstLine[0].length; wordIndex++) {
			expect((actual as (0 | 1)[][])[index][wordIndex]).toBe(expected[index][wordIndex]);
		}
	}
});
