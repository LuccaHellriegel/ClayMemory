"use strict";

import { transformInputOrigin } from "./transformInputOrigin";

// multiple base origins, so I can show that I dont cast a 0 somewhere
const singleOrigin = { spanIndex: 0, page: 1 };
const singleOrigin2 = { spanIndex: 20, page: 11 };

const noteOrigin = singleOrigin;
const noteOrigin2 = singleOrigin2;

const qaQOrigin = { q: singleOrigin, a: {} };
const qaQOrigin2 = { q: singleOrigin2, a: {} };

const qaAOrigin = { a: singleOrigin, q: {} };
const qaAOrigin2 = { a: singleOrigin2, q: {} };

const QAOrigin = { a: singleOrigin, q: singleOrigin };
const QAOrigin2 = { a: singleOrigin, q: singleOrigin2 };
const QAOrigin3 = { a: singleOrigin2, q: singleOrigin };
const QAOrigin4 = { a: singleOrigin2, q: singleOrigin2 };

test("No goal origin: transforms input origin with same CreationType correctly", () => {
	expect(transformInputOrigin(noteOrigin, "NOTE", "NOTE")).toBe(noteOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "NOTE")).toBe(noteOrigin2);

	expect(transformInputOrigin(qaQOrigin, "Q", "Q")).toBe(qaQOrigin);
	expect(transformInputOrigin(qaQOrigin2, "Q", "Q")).toBe(qaQOrigin2);
});

test("No goal origin: transforms input origin with NOTE sourceField correctly", () => {
	expect(transformInputOrigin(noteOrigin, "NOTE", "Q")).toEqual(qaQOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "Q")).toEqual(qaQOrigin2);

	expect(transformInputOrigin(noteOrigin, "NOTE", "A")).toEqual(qaAOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "A")).toEqual(qaAOrigin2);
});

test("No goal origin: transforms input origin with NOTE creationType correctly", () => {
	expect(transformInputOrigin(qaQOrigin, "Q", "NOTE")).toEqual(noteOrigin);
	expect(transformInputOrigin(qaQOrigin2, "Q", "NOTE")).toEqual(noteOrigin2);

	expect(transformInputOrigin(qaAOrigin, "A", "NOTE")).toEqual(noteOrigin);
	expect(transformInputOrigin(qaAOrigin2, "A", "NOTE")).toEqual(noteOrigin2);

	expect(transformInputOrigin(QAOrigin, "Q", "NOTE")).toEqual(noteOrigin);
	expect(transformInputOrigin(QAOrigin2, "Q", "NOTE")).toEqual(noteOrigin2);

	expect(transformInputOrigin(QAOrigin3, "A", "NOTE")).toEqual(noteOrigin2);
	expect(transformInputOrigin(QAOrigin4, "A", "NOTE")).toEqual(noteOrigin2);
});

test("No goal origin: transforms input origin with Q creationType correctly", () => {
	expect(transformInputOrigin(qaAOrigin, "A", "Q")).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaAOrigin2, "A", "Q")).toEqual(qaQOrigin2);

	expect(transformInputOrigin(QAOrigin3, "A", "Q")).toEqual(qaQOrigin2);
	expect(transformInputOrigin(QAOrigin4, "A", "Q")).toEqual(qaQOrigin2);
});

test("No goal origin: transforms input origin with A creationType correctly", () => {
	expect(transformInputOrigin(qaQOrigin, "Q", "A")).toEqual(qaAOrigin);
	expect(transformInputOrigin(qaQOrigin2, "Q", "A")).toEqual(qaAOrigin2);

	expect(transformInputOrigin(QAOrigin3, "Q", "A")).toEqual(qaAOrigin);
	expect(transformInputOrigin(QAOrigin4, "Q", "A")).toEqual(qaAOrigin2);
});

test("transforms input origin with same CreationType correctly", () => {
	expect(transformInputOrigin(noteOrigin, "NOTE", "NOTE", noteOrigin2)).toEqual(noteOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "NOTE", noteOrigin)).toEqual(noteOrigin2);

	expect(transformInputOrigin(qaQOrigin, "Q", "Q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaQOrigin2, "Q", "Q", qaQOrigin)).toEqual(qaQOrigin2);

	//overwritting a single field
	expect(transformInputOrigin(QAOrigin, "Q", "Q", QAOrigin2)).toEqual(QAOrigin);
	expect(transformInputOrigin(QAOrigin2, "Q", "Q", QAOrigin)).toEqual(QAOrigin2);
});

test("transforms input origin with NOTE sourceField correctly", () => {
	expect(transformInputOrigin(noteOrigin, "NOTE", "Q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "Q", qaQOrigin)).toEqual(qaQOrigin2);

	expect(transformInputOrigin(noteOrigin, "NOTE", "A", qaAOrigin2)).toEqual(qaAOrigin);
	expect(transformInputOrigin(noteOrigin2, "NOTE", "A", qaAOrigin)).toEqual(qaAOrigin2);
});

test("transforms input origin with Q creationType correctly", () => {
	expect(transformInputOrigin(qaAOrigin, "A", "Q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaAOrigin2, "A", "Q", qaQOrigin)).toEqual(qaQOrigin2);

	// these are the most relevant ones, because they involve the most logic when overwritting
	expect(transformInputOrigin(QAOrigin3, "A", "Q", QAOrigin4)).toEqual(QAOrigin4);
	expect(transformInputOrigin(QAOrigin4, "A", "Q", QAOrigin3)).toEqual(QAOrigin4);
	expect(transformInputOrigin(QAOrigin2, "A", "Q", QAOrigin4)).toEqual(QAOrigin3);
	expect(transformInputOrigin(QAOrigin, "A", "Q", QAOrigin4)).toEqual(QAOrigin3);

	expect(transformInputOrigin(noteOrigin, "NOTE", "Q", qaAOrigin2)).toEqual(QAOrigin3);
});
