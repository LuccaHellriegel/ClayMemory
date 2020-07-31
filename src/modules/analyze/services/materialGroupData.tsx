import { MaterialGroupData } from "../model";
import { spanToWordRanges } from "./spanToWordRanges";

export const sortSpansByBoundingRectY = (spans: HTMLSpanElement[], boundingRects: DOMRect[]) => {
	let joined = spans.map((span, index) => [span, boundingRects[index]]);
	joined = joined.sort((arr, arr2) => {
		return (arr[1] as DOMRect).y - (arr2[1] as DOMRect).y;
	});
	return [joined.map((arr) => arr[0] as HTMLSpanElement), joined.map((arr) => arr[1] as DOMRect)];
};

export const sortSpansByBoundingRectX = (spans: HTMLSpanElement[], boundingRects: DOMRect[]) => {
	let joined = spans.map((span, index) => [span, boundingRects[index]]);
	joined = joined.sort((arr, arr2) => {
		return (arr[1] as DOMRect).x - (arr2[1] as DOMRect).x;
	});
	return [joined.map((arr) => arr[0] as HTMLSpanElement), joined.map((arr) => arr[1] as DOMRect)];
};

//TODO: what about spans in same line or nearly same line? (Abschlussarbeit-Anmeldung PDF as example)
export function materialGroupData(container: HTMLDivElement): MaterialGroupData | null {
	// assumes all spans inside the document are relevant (potentially multiple pages)
	let spans = Array.from(container.querySelectorAll("span"));
	if (spans.length === 0) return null;

	let boundingRects = spans.map((span) => span.getBoundingClientRect());

	const [sortedSpans, sortedBoundingRects] = sortSpansByBoundingRectY(spans, boundingRects);
	spans = sortedSpans as HTMLSpanElement[];
	boundingRects = sortedBoundingRects as DOMRect[];

	let materialSpanGroups: HTMLSpanElement[][] = [[spans[0]]];
	let materialBoundingRectGroups: DOMRect[][] = [[boundingRects[0]]];

	let prevRect = boundingRects[0];
	let prevHeight = prevRect.bottom - prevRect.y;

	for (let index = 1; index < spans.length; index++) {
		const curSpan = spans[index];
		const curRect = boundingRects[index];

		// assumes that the spans are directly beneath each other
		// and that the additional offset between y-left-top of spans (between text) is at most 0.5*height
		const distRects = Math.abs(prevRect.y - curRect.y);
		const newSectionStarts = distRects > 1.5 * prevHeight;
		if (newSectionStarts) {
			materialSpanGroups.push([]);
			materialBoundingRectGroups.push([]);
		}

		materialSpanGroups[materialSpanGroups.length - 1].push(curSpan);
		materialBoundingRectGroups[materialBoundingRectGroups.length - 1].push(curRect);

		prevRect = curRect;
		prevHeight = curRect.bottom - curRect.y;
	}

	const tempSpanGroups = [];
	const tempBoundingRectGroups = [];

	for (let index = 0; index < materialSpanGroups.length; index++) {
		const spanGroup = materialSpanGroups[index];
		const boundingRectGroup = materialBoundingRectGroups[index];
		const [sortedSpanGroup, sortedBoundingRectGroup] = sortSpansByBoundingRectX(spanGroup, boundingRectGroup);
		tempSpanGroups.push(sortedSpanGroup);
		tempBoundingRectGroups.push(sortedBoundingRectGroup);
	}

	materialSpanGroups = tempSpanGroups as HTMLSpanElement[][];
	materialBoundingRectGroups = tempBoundingRectGroups as DOMRect[][];

	const materialWordGroups = materialSpanGroups.map((group) => group.map((span) => spanToWordRanges(span)));

	const materialWordSelectionGroups: (1 | 0)[][][] = materialWordGroups.map((group) =>
		group.map((words) => words.map((_) => 1))
	);

	return {
		materialSpanGroups,
		materialBoundingRectGroups,
		materialWordGroups,
		materialWordSelectionGroups,
	};
}
