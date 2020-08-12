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

type ExpandedSpan = { span: HTMLSpanElement; rect: DOMRect };

export const expandSpans = (spans: HTMLSpanElement[]) => spans.map(expandSpan);

const expandSpan = (span: HTMLSpanElement): ExpandedSpan => {
	return { span, rect: span.getBoundingClientRect() };
};
