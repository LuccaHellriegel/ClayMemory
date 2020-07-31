import { MaterialGroupData } from "../model";
import { spanToWordRanges } from "./spanToWordRanges";

//TODO: what about spans in same line or nearly same line? (Abschlussarbeit-Anmeldung PDF as example)
export function materialGroupData(container: HTMLDivElement): MaterialGroupData | null {
	// assumes all spans inside the document are relevant (potentially multiple pages)
	const spans = Array.from(container.querySelectorAll("span"));
	if (spans.length === 0) return null;

	const boundingRects = spans.map((span) => span.getBoundingClientRect());

	const materialSpanGroups: HTMLSpanElement[][] = [[spans[0]]];
	const materialBoundingRectGroups: DOMRect[][] = [[boundingRects[0]]];

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
