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
	expect(transformInputOrigin(noteOrigin, "note", "note")).toBe(noteOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "note")).toBe(noteOrigin2);

	expect(transformInputOrigin(qaQOrigin, "q", "q")).toBe(qaQOrigin);
	expect(transformInputOrigin(qaQOrigin2, "q", "q")).toBe(qaQOrigin2);
});

test("No goal origin: transforms input origin with note sourceField correctly", () => {
	expect(transformInputOrigin(noteOrigin, "note", "q")).toEqual(qaQOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "q")).toEqual(qaQOrigin2);

	expect(transformInputOrigin(noteOrigin, "note", "a")).toEqual(qaAOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "a")).toEqual(qaAOrigin2);
});

test("No goal origin: transforms input origin with note creationType correctly", () => {
	expect(transformInputOrigin(qaQOrigin, "q", "note")).toEqual(noteOrigin);
	expect(transformInputOrigin(qaQOrigin2, "q", "note")).toEqual(noteOrigin2);

	expect(transformInputOrigin(qaAOrigin, "a", "note")).toEqual(noteOrigin);
	expect(transformInputOrigin(qaAOrigin2, "a", "note")).toEqual(noteOrigin2);

	expect(transformInputOrigin(QAOrigin, "q", "note")).toEqual(noteOrigin);
	expect(transformInputOrigin(QAOrigin2, "q", "note")).toEqual(noteOrigin2);

	expect(transformInputOrigin(QAOrigin3, "a", "note")).toEqual(noteOrigin2);
	expect(transformInputOrigin(QAOrigin4, "a", "note")).toEqual(noteOrigin2);
});

test("No goal origin: transforms input origin with Q creationType correctly", () => {
	expect(transformInputOrigin(qaAOrigin, "a", "q")).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaAOrigin2, "a", "q")).toEqual(qaQOrigin2);

	expect(transformInputOrigin(QAOrigin3, "a", "q")).toEqual(qaQOrigin2);
	expect(transformInputOrigin(QAOrigin4, "a", "q")).toEqual(qaQOrigin2);
});

test("No goal origin: transforms input origin with A creationType correctly", () => {
	expect(transformInputOrigin(qaQOrigin, "q", "a")).toEqual(qaAOrigin);
	expect(transformInputOrigin(qaQOrigin2, "q", "a")).toEqual(qaAOrigin2);

	expect(transformInputOrigin(QAOrigin3, "q", "a")).toEqual(qaAOrigin);
	expect(transformInputOrigin(QAOrigin4, "q", "a")).toEqual(qaAOrigin2);
});

test("transforms input origin with same CreationType correctly", () => {
	expect(transformInputOrigin(noteOrigin, "note", "note", noteOrigin2)).toEqual(noteOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "note", noteOrigin)).toEqual(noteOrigin2);

	expect(transformInputOrigin(qaQOrigin, "q", "q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaQOrigin2, "q", "q", qaQOrigin)).toEqual(qaQOrigin2);

	//overwritting a single field
	expect(transformInputOrigin(QAOrigin, "q", "q", QAOrigin2)).toEqual(QAOrigin);
	expect(transformInputOrigin(QAOrigin2, "q", "q", QAOrigin)).toEqual(QAOrigin2);
});

test("transforms input origin with note sourceField correctly", () => {
	expect(transformInputOrigin(noteOrigin, "note", "q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "q", qaQOrigin)).toEqual(qaQOrigin2);

	expect(transformInputOrigin(noteOrigin, "note", "a", qaAOrigin2)).toEqual(qaAOrigin);
	expect(transformInputOrigin(noteOrigin2, "note", "a", qaAOrigin)).toEqual(qaAOrigin2);
});

test("transforms input origin with Q creationType correctly", () => {
	expect(transformInputOrigin(qaAOrigin, "a", "q", qaQOrigin2)).toEqual(qaQOrigin);
	expect(transformInputOrigin(qaAOrigin2, "a", "q", qaQOrigin)).toEqual(qaQOrigin2);

	// these are the most relevant ones, because they involve the most logic when overwritting
	expect(transformInputOrigin(QAOrigin3, "a", "q", QAOrigin4)).toEqual(QAOrigin4);
	expect(transformInputOrigin(QAOrigin4, "a", "q", QAOrigin3)).toEqual(QAOrigin4);
	expect(transformInputOrigin(QAOrigin2, "a", "q", QAOrigin4)).toEqual(QAOrigin3);
	expect(transformInputOrigin(QAOrigin, "a", "q", QAOrigin4)).toEqual(QAOrigin3);

	expect(transformInputOrigin(noteOrigin, "note", "q", qaAOrigin2)).toEqual(QAOrigin3);
});
