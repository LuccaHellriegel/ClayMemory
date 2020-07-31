import { MaterialGroupData } from "../model";

function spanToWordRanges(span: HTMLSpanElement) {
	const result: Range[] = [];
	const textNode = span.childNodes[0];
	const textContent = span.textContent;

	if (textContent) {
		const possiblyWords = textContent.split(" ");
		//console.log(possiblyWords, textContent);

		let startOffset = 0;
		let endOffset = 0;

		for (const word of possiblyWords) {
			if (word.length >= 1) {
				endOffset += word.length;

				if (result.length > 0) endOffset += 1;

				let range = document.createRange();

				range.setStart(textNode, startOffset);
				range.setEnd(textNode, endOffset);

				result.push(range);

				startOffset += word.length + 1;
			} else {
				startOffset += 1;
				endOffset += 1;
			}
		}
	}

	return result;
}

//TODO: what about spans in same line or nearly same line? (Abschlussarbeit-Anmeldung PDF as example)
export function materialGroupData(container: HTMLDivElement): MaterialGroupData | null {
	// assumes all spans inside the document are relevant (potentially multiple pages)
	const spans = Array.from(container.querySelectorAll("span"));
	if (spans.length === 0) return null;

	const spanGroups: HTMLSpanElement[][] = [];
	const boundingRectGroups: DOMRect[][] = [];

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

	const materialWordGroups = spanGroups.map((group) => group.map((span) => spanToWordRanges(span)));
	const materialWordSelectionGroups: (1 | 0)[][][] = materialWordGroups.map((group) =>
		group.map((words) => words.map((_) => 1))
	);

	return {
		materialSpanGroups: spanGroups,
		materialBoundingRectGroups: boundingRectGroups,
		materialWordGroups,
		materialWordSelectionGroups,
	};
}
