"use strict";

import { validatePageChoice } from "./PageChooser";

test("incorrect input for page choice", () => {
	expect(validatePageChoice("", 10)).toBe(false);
	expect(validatePageChoice("test", 10)).toBe(false);
	expect(validatePageChoice("test1", 10)).toBe(false);
	expect(validatePageChoice("12test1", 10)).toBe(false);
	expect(validatePageChoice("12 1", 10)).toBe(false);
});

test("out of bounds page choice", () => {
	expect(validatePageChoice("0", 10)).toBe(false);
	expect(validatePageChoice("-0", 10)).toBe(false);
	expect(validatePageChoice("-1", 10)).toBe(false);
	expect(validatePageChoice("11", 10)).toBe(false);
	expect(validatePageChoice("150", 10)).toBe(false);
});

test("valid page choice", () => {
	expect(validatePageChoice("1", 10)).toBe(true);
	expect(validatePageChoice("1 ", 10)).toBe(true);
	expect(validatePageChoice(" 1", 10)).toBe(true);
	expect(validatePageChoice(" 1 ", 10)).toBe(true);
	expect(validatePageChoice("10", 10)).toBe(true);
	expect(validatePageChoice("5", 10)).toBe(true);
});
