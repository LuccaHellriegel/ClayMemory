import { MaterialGroupData } from "../model";
import { expandSpans, sortExpandedSpansAccordingToY, splitExpandedSpans } from "./span";

export const materialData = (container: HTMLDivElement): MaterialGroupData | null => {
	// assumes all spans inside the document are relevant (potentially multiple pages)
	const startingSpans = Array.from(container.querySelectorAll("span"));
	if (startingSpans.length === 0) return null;

	const { spans, boundingRects } = splitExpandedSpans(sortExpandedSpansAccordingToY(expandSpans(startingSpans)));

	return {
		materialSpans: spans,
		materialBoundingRects: boundingRects,
	};
};
