"use strict";

import { riverMakeUpIDToPageNumber, pageNumberToRiverMakeUpID } from "./model";

test("page-numbers get correctly transformed to riverIDs", () => {
	expect(pageNumberToRiverMakeUpID(1)).toBe("CardRiver 1");
	expect(pageNumberToRiverMakeUpID(45)).toBe("CardRiver 45");
});

test("riverIDs get correctly transformed to page-numbers", () => {
	expect(riverMakeUpIDToPageNumber(pageNumberToRiverMakeUpID(1))).toBe(1);
	expect(riverMakeUpIDToPageNumber(pageNumberToRiverMakeUpID(76))).toBe(76);

	expect(riverMakeUpIDToPageNumber("CardRiver 745")).toBe(745);
	expect(riverMakeUpIDToPageNumber("CardRiver 12354")).toBe(12354);
});
