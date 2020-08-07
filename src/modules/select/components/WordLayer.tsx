import React, { useMemo, useEffect } from "react";
import { Layer } from "react-konva";
import { LayerConfig } from "konva/types/Layer";
import { RectConfig } from "konva/types/shapes/Rect";
import { Rect } from "react-konva";
import { incrementer } from "../../../shared/utils";

function BoundingRectRect({
	xOffset = 0,
	yOffset = 0,
	boundingRect,
	...props
}: {
	xOffset: number;
	yOffset: number;
	boundingRect: DOMRect;
} & RectConfig) {
	return (
		<Rect
			x={boundingRect.x - xOffset}
			y={boundingRect.y - yOffset}
			width={boundingRect.width}
			height={boundingRect.bottom - boundingRect.y}
			{...props}
		/>
	);
}

const wordRangesToRects = (flatWordRanges: Range[], flatSelectionGroup: any, containerRect: DOMRect, color: string) => {
	let increment = incrementer();

	return flatWordRanges
		.map((range, index) =>
			flatSelectionGroup[index] === 1 ? (
				<BoundingRectRect
					xOffset={containerRect.x}
					yOffset={containerRect.y}
					boundingRect={range.getBoundingClientRect()}
					shadowBlur={5}
					stroke={color}
					opacity={0.3}
					key={increment()}
				></BoundingRectRect>
			) : null
		)
		.filter((val) => val !== null);
};

export function WordLayer({
	spanGroup,
	wordRangeGroup,
	color,
	selectionGroup,
	container,
	showRects,
	...props
}: {
	spanGroup: HTMLSpanElement[];
	wordRangeGroup: Range[][];
	container: HTMLDivElement;
	showRects: boolean;
} & LayerConfig) {
	// we want to be able to quickly show/hide the rects, so we need to memoize
	// dependency is on the props (which stay the same if unchanged)
	const boundingRectRects = useMemo(
		() => wordRangesToRects(wordRangeGroup.flat(), selectionGroup.flat(), container.getBoundingClientRect(), color),
		[selectionGroup, wordRangeGroup, container, color]
	);

	useEffect(() => {
		if (showRects) {
			spanGroup[0].focus();
			spanGroup[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	}, [spanGroup, showRects]);

	return <Layer {...props}>{showRects && boundingRectRects}</Layer>;
}
