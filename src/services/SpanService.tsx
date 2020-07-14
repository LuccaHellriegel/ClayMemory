import { spanToWordRanges } from "./RangeService";

export type SpanDataGroups = {
	spanGroups: HTMLSpanElement[][];
	boundingRectGroups: DOMRect[][];
	wordGroups: Range[][][];
	selectionGroups: (1 | 0)[][][];
};

//TODO: what about spans in same line or nearly same line? (Abschlussarbeit-Anmeldung PDF as example)
export function getSpanDataGroups(container: HTMLDivElement): SpanDataGroups | null {
	const spanGroups: HTMLSpanElement[][] = [];
	const boundingRectGroups: DOMRect[][] = [];

	// assumes all spans inside the document are relevant (potentially multiple pages)
	const spans = Array.from(container.querySelectorAll("span"));
	if (spans.length === 0) return null;

	const boundingRects = spans.map((span) => span.getBoundingClientRect());

	spanGroups.push([spans[0]]);
	boundingRectGroups.push([boundingRects[0]]);

	let prevRect = boundingRects[0];
	let prevHeight = prevRect.bottom - prevRect.y;

	for (let index = 1; index < spans.length; index++) {
		const curSpan = spans[index];
		const curRect = boundingRects[index];

		// assumes that the spans are directly beneath each other
		// and that the additional offset between y-left-top of spans (between text) is at most 0.5*height
		const distRects = Math.abs(prevRect.y - curRect.y);
		if (distRects > 1.5 * prevHeight) {
			spanGroups.push([]);
			boundingRectGroups.push([]);
		}

		spanGroups[spanGroups.length - 1].push(curSpan);
		boundingRectGroups[boundingRectGroups.length - 1].push(curRect);

		prevRect = curRect;
		prevHeight = curRect.bottom - curRect.y;
	}

	const wordGroups = spanGroups.map((group) => group.map((span) => spanToWordRanges(span)));
	const selectionGroups: (1 | 0)[][][] = wordGroups.map((group) => group.map((words) => words.map((_) => 1)));

	return {
		spanGroups,
		boundingRectGroups,
		wordGroups,
		selectionGroups,
	};
}
