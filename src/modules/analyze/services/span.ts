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

type ExpandedSpanGroupingComparator = (expandSpan: ExpandedSpan, expandSpan2: ExpandedSpan) => boolean;

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

const expandSpan = (span: HTMLSpanElement): ExpandedSpan => {
	return { span, rect: span.getBoundingClientRect() };
};
