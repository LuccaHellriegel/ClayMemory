"use strict";

import React from "react";
import { backgroundStyle, highlightPattern } from "./PDFPage";

test("marked correctly", () => {
	// empty string short circuit
	expect(highlightPattern("text", "")).toBe("text");
	expect(highlightPattern("", "")).toBe("");
	expect(highlightPattern("", "text")).toBe("");
	// too long short circuit
	expect(highlightPattern("text", "texttext")).toBe("text");

	// firstIndex - not found
	expect(highlightPattern("text", "NO")).toBe("text");

	// firstIndex - found
	expect(highlightPattern("NOtexttextNO", "texttext")).toEqual([
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
	]);
	expect(highlightPattern("texttextNO", "texttext")).toEqual([<mark style={backgroundStyle}>{"texttext"}</mark>, "NO"]);
	expect(highlightPattern("NOtexttext", "texttext")).toEqual(["NO", <mark style={backgroundStyle}>{"texttext"}</mark>]);

	// secondIndex - found
	expect(highlightPattern("NOtexttextNOtexttext", "texttext")).toEqual([
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
	]);
	expect(highlightPattern("texttextNOtexttext", "texttext")).toEqual([
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
	]);
	expect(highlightPattern("NOtexttexttexttext", "texttext")).toEqual([
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
	]);

	// more than two indices
	expect(highlightPattern("NOtexttextNOtexttexttexttext", "texttext")).toEqual([
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
	]);
	expect(highlightPattern("texttextNOtexttexttexttexttexttext", "texttext")).toEqual([
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
	]);
	expect(highlightPattern("texttextNOtexttexttexttexttexttextNONO", "texttext")).toEqual([
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NONO",
	]);
	expect(highlightPattern("texttextNOtexttexttexttexttexttextNONOtexttextNONOa!", "texttext")).toEqual([
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NONO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NONOa!",
	]);
	expect(highlightPattern("texttextNOtexttexttexttexttexttextNONOtexttextNONOa!texttextBlaBla!", "texttext")).toEqual([
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		// this is the start of the splitText-arr, so no ""
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NONO",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"NONOa!",
		<mark style={backgroundStyle}>{"texttext"}</mark>,
		"BlaBla!",
	]);

	// equal
	expect(highlightPattern("texttext", "texttext")).toEqual([<mark style={backgroundStyle}>{"texttext"}</mark>]);
});
