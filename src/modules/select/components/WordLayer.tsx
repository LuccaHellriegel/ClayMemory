import React from "react";
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

/* <BoundingRectRect
xOffset={0}
yOffset={0}
boundingRect={{ x: 0, y: 0, width: 100, bottom: 100 } as DOMRect}
shadowBlur={5}
stroke={"blue"}
opacity={1}
key={increment()}
></BoundingRectRect> */

export function WordLayer({
	spanGroup,
	wordRangeGroup,
	color,
	selectionGroup,
	...props
}: { spanGroup: HTMLSpanElement[]; wordRangeGroup: Range[][] } & LayerConfig) {
	// TODO: Make React-ly solution for getting this here?
	// assumes there is only one document
	const container = document.querySelector("div.react-pdf__Document");

	if (container) {
		spanGroup[0].focus();
		spanGroup[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		const containerRect = container.getBoundingClientRect();

		const flatSelectionGroup = selectionGroup.flat();
		const flatWordRanges = wordRangeGroup.flat();
		let increment = incrementer();

		return (
			<Layer {...props}>
				{flatWordRanges.map((range, index) =>
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
				)}
			</Layer>
		);
	}

	return null;
}
