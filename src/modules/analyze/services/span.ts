import { strToWords } from "./str";

export const splitExpandedSpans = (expandedSpans: ExpandedSpan[]) => {
	const spans = [];
	const boundingRects = [];

	for (const exSpan of expandedSpans) {
		spans.push(exSpan.span);
		boundingRects.push(exSpan.rect);
	}

	return { spans, boundingRects };
};

export const sortExpandedSpansAccordingToX = (expandedSpans: ExpandedSpan[]) =>
	expandedSpans.sort((exSpan, exSpan2) => exSpan.rect.x - exSpan2.rect.x);

export const sortExpandedSpansAccordingToY = (expandedSpans: ExpandedSpan[]) =>
	expandedSpans.sort((exSpan, exSpan2) => exSpan.rect.y - exSpan2.rect.y);

export type ExpandedSpanGroupingComparator = (expandSpan: ExpandedSpan, expandSpan2: ExpandedSpan) => boolean;

export const groupExpandedSpans = (
	expandedSpans: ExpandedSpan[],
	groupingComparator: ExpandedSpanGroupingComparator
) => {
	// depends on the spans being sorted according to grouping

	let previousSpan = expandedSpans[0];
	const groups = [[previousSpan]];

	for (let index = 1; index < expandedSpans.length; index++) {
		const currentSpan = expandedSpans[index];
		//new group
		if (groupingComparator(previousSpan, currentSpan)) groups.push([]);
		groups[groups.length - 1].push(currentSpan);
		previousSpan = currentSpan;
	}

	return groups;
};

export type ExpandedSpan = { span: HTMLSpanElement; rect: DOMRect };

export const expandSpans = (spans: HTMLSpanElement[]) => spans.map(expandSpan);

export const expandSpan = (span: HTMLSpanElement): ExpandedSpan => {
	return { span, rect: span.getBoundingClientRect() };
};

export function spanToWordRanges(span: HTMLSpanElement) {
	const result: Range[] = [];

	//node is needed for Range object
	const textNode = span.childNodes[0];
	const textContent = span.textContent;

	if (textContent) {
		const possiblyWords = strToWords(textContent);

		//to create the Range objects we need the correct offset, otherwise it would be more straightforward parsing
		let startOffset = 0;
		let endOffset = 0;

		for (const word of possiblyWords) {
			const moreThanEmptySpace = word.length >= 1;
			if (moreThanEmptySpace) {
				endOffset += word.length;

				const firstRange = result.length > 0;
				// offset is >= 1 because we split at " " and not ""
				if (firstRange) endOffset += 1;

				const range = document.createRange();

				range.setStart(textNode, startOffset);
				range.setEnd(textNode, endOffset);

				result.push(range);

				startOffset += word.length + 1;
			} else {
				// if empty space, this means str started with empty space or ended with it, so need to move forward
				startOffset += 1;
				endOffset += 1;
			}
		}
	}

	return result;
}
