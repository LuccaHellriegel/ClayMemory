import { RectConfig } from "konva/types/shapes/Rect";
import { Rect } from "react-konva";
import React from "react";

export function BoundingRectRect({
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
