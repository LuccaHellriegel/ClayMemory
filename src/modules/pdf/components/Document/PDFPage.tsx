import React, { useRef } from "react";
import { Page } from "react-pdf";
import { TextLayerItemInternal } from "react-pdf/dist/Page";
import { useSelector } from "react-redux";
import { SingleOrigin } from "../../../cards/model/origin";
import { PageSpanControl } from "../Origin/PageSpanControl";
import selection from "../../../selection";
import { getDocumentSearch, getSpanOrigin } from "../../selectors";
import { MaterialMultiplier } from "../../constants";
import { PageKeyboardControl } from "../Navigation/PageKeyboardControl";

// TODO: zoom, too much zoom right now?
// "I dont know what I am searching and need an overview"

type Renderer = (
	textItem: TextLayerItemInternal | (TextLayerItemInternal & { str: string | JSX.Element })
) => JSX.Element | string;

const highlightOrigin = (textItem: TextLayerItemInternal, origin: SingleOrigin) => {
	const itemIndex = textItem.itemIndex;
	if (!(itemIndex >= origin.spanIndexStart && itemIndex <= origin.spanIndexEnd)) {
		return textItem.str;
	}

	// does not really make sense to make more fine-grained mark if the TextLayer is off anyways
	return <mark style={{ backgroundColor: "red" }}>{textItem.str}</mark>;
};

const makeOriginHighlighter = (origin: SingleOrigin) => {
	return (textItem: TextLayerItemInternal) => {
		return highlightOrigin(textItem, origin);
	};
};

export const backgroundStyle = { backgroundColor: "blue" };

// TODO: this could be made clearer and cleaner
export const highlightPattern = (text: string, pattern: string) => {
	// the idea is that:
	// no matches are most likely
	// 1 or 2 are second most likely
	// after that the pattern must be really small,
	// so then we can look at the whole string
	// generally verbosity is used to guarantee speed
	// potentially 400+ items need to be processed for every search, so no room for slack

	const textLength = text.length;
	const patternLength = pattern.length;
	// most of the TextItems should not have a highlight, so short-circuit is advised
	if (pattern === "" || text === "" || patternLength > textLength) return text;

	// fastest match seems to be indexOf: https://jsben.ch/RVYk7
	const index = text.indexOf(pattern);
	if (index === -1) return text;

	// react says to use unqiue elements with keys, I choose not to for speed reasons
	const markedPattern = <mark style={backgroundStyle}>{pattern}</mark>;
	const slice1 = index > 0 ? text.slice(0, index) : false;

	let result = [];
	if (slice1) result.push(slice1);
	result.push(markedPattern);

	const secondIndex = text.indexOf(pattern, index + patternLength);
	if (secondIndex === -1) {
		const slice2Start = index + patternLength;
		const slice2 = slice2Start < textLength ? text.slice(slice2Start) : false;
		if (slice2) result.push(slice2);
		return result;
	}

	const slice2Start = index + patternLength;
	const slice2 = slice2Start !== secondIndex ? text.slice(slice2Start, secondIndex) : false;
	if (slice2) result.push(slice2);
	result.push(markedPattern);

	const thirdIndex = text.indexOf(pattern, secondIndex + patternLength);
	if (thirdIndex === -1) {
		const slice3Start = secondIndex + patternLength;
		const slice3 = slice3Start < textLength ? text.slice(slice3Start) : false;
		if (slice3) result.push(slice2);
		return result;
	}

	const slice3Start = secondIndex + patternLength;
	const slice3 = slice3Start < textLength ? text.slice(slice3Start, thirdIndex) : false;
	if (slice3) result.push(slice3);
	result.push(markedPattern);

	if (thirdIndex + patternLength === textLength) {
		return result;
	}

	const stringRest = text.slice(thirdIndex + patternLength);
	if (stringRest === pattern) {
		result.push(markedPattern);
		return result;
	}

	const splitText = stringRest.split(pattern);
	if (splitText.length <= 1) {
		result.push(stringRest);
		return result;
	}

	for (let index = 0; index < splitText.length; index++) {
		const spliter = splitText[index];
		if (index === 0 && spliter === "") {
			result.push(markedPattern);
			continue;
		}

		if (index === splitText.length - 1 && spliter !== "") {
			result.push(spliter);
			continue;
		}

		if (spliter !== "") result.push(spliter);
		result.push(markedPattern);
	}

	return result as any;
};

function makeTextRenderer(searchText: string) {
	return function textRenderer(textItem: TextLayerItemInternal) {
		return highlightPattern(textItem.str, searchText);
	};
}

const combineRenderers = (searchRenderer?: Renderer, originRenderer?: Renderer) => {
	if (!searchRenderer) return originRenderer;
	if (!originRenderer) return searchRenderer;
	return (textItem: TextLayerItemInternal) => originRenderer({ ...textItem, str: searchRenderer(textItem) as any });
};

//TODO: when switching from a small page to big, the ControlBar does not size back

export const PDFPage = ({ pageNumber, materialWidth }: { pageNumber: number; materialWidth: number }) => {
	//assumption is that the list checks for width before rendering
	const documentSearch = useSelector(getDocumentSearch);
	const spanOrigin = useSelector(getSpanOrigin);

	const originHighlighter =
		spanOrigin && spanOrigin.page === pageNumber ? makeOriginHighlighter(spanOrigin) : undefined;
	const searchRenderer = documentSearch !== "" ? makeTextRenderer(documentSearch) : undefined;

	const textRenderer = combineRenderers(searchRenderer, originHighlighter);

	const pageRef = useRef<null | HTMLDivElement>(null);

	return (
		<div style={{ overflow: "auto" }}>
			<selection.components.MaterialMouseUp page={pageNumber}>
				<PageKeyboardControl>
					<Page
						inputRef={(instance) => {
							pageRef.current = instance;
						}}
						pageNumber={pageNumber}
						width={materialWidth * MaterialMultiplier}
						customTextRenderer={textRenderer as any}
						renderAnnotationLayer={false}
					/>
				</PageKeyboardControl>
			</selection.components.MaterialMouseUp>
			<PageSpanControl page={pageNumber} pageRef={pageRef}></PageSpanControl>
		</div>
	);
};
