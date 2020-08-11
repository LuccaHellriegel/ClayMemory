import { MaterialGroupData } from "../model";
import {
	expandSpans,
	groupExpandedSpans,
	sortExpandedSpansAccordingToY,
	sortExpandedSpansAccordingToX,
	ExpandedSpan,
	splitExpandedSpans,
} from "./span";
import { isDistHigherThanFirstHeight } from "../../../shared/rect";

const groupExpandedSpansAccordingToHeightDiff = (expandedSpans: ExpandedSpan[]) =>
	groupExpandedSpans(expandedSpans, (exSpan, expSpan2) => isDistHigherThanFirstHeight(exSpan.rect, expSpan2.rect));

export const materialGroupData = (container: HTMLDivElement): MaterialGroupData | null => {
	// assumes all spans inside the document are relevant (potentially multiple pages)
	const spans = Array.from(container.querySelectorAll("span"));
	if (spans.length === 0) return null;

	const expandedSpans = sortExpandedSpansAccordingToY(expandSpans(spans));
	const expandedSpanGroups = groupExpandedSpansAccordingToHeightDiff(expandedSpans).map((group) =>
		sortExpandedSpansAccordingToX(group)
	);
	const splitGroups = expandedSpanGroups.map((group) => splitExpandedSpans(group));
	const [materialSpanGroups, materialBoundingRectGroups] = splitGroups.reduce(
		(prev, cur) => {
			(prev[0] as HTMLSpanElement[][]).push(cur.spans);
			(prev[1] as DOMRect[][]).push(cur.boundingRects);
			return prev;
		},
		[[], []]
	);

	return {
		materialSpanGroups,
		materialBoundingRectGroups,
	};
};
