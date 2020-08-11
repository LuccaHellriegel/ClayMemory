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

const spansToRects = (spanGroup: HTMLSpanElement[], containerRect: DOMRect, color: string) => {
	let increment = incrementer();

	return spanGroup.map((span) => (
		<BoundingRectRect
			xOffset={containerRect.x}
			yOffset={containerRect.y}
			boundingRect={span.getBoundingClientRect()}
			shadowBlur={5}
			stroke={color}
			opacity={0.3}
			key={increment()}
		></BoundingRectRect>
	));
};

export function WordLayer({
	spanGroup,
	color,
	container,
	showRects,
	...props
}: {
	spanGroup: HTMLSpanElement[];
	container: HTMLDivElement;
	showRects: boolean;
} & LayerConfig) {
	// we want to be able to quickly show/hide the rects, so we need to memoize
	// dependency is on the props (which stay the same if unchanged)
	const boundingRectRects = useMemo(() => spansToRects(spanGroup, container.getBoundingClientRect(), color), [
		spanGroup,
		container,
		color,
	]);

	useEffect(() => {
		if (showRects) {
			spanGroup[0].focus();
			spanGroup[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	}, [spanGroup, showRects]);

	return <Layer {...props}>{showRects && boundingRectRects}</Layer>;
}
