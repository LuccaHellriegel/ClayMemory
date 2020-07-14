import React from "react";
import { Layer } from "react-konva";
import { spanToWordRanges } from "../../services/RangeService";
import { LayerConfig } from "konva/types/Layer";
import { BoundingRectRect } from "./BoundingRectRect";

export function WordLayer({ spans, color, selectionGroup, ...props }: { spans: HTMLSpanElement[] } & LayerConfig) {
	const wordRanges = spans.map((span) => spanToWordRanges(span)).flat();
	// TODO: Make React-ly solution for getting this here?
	// assumes there is only one document
	const container = document.querySelector("div.react-pdf__Document");

	if (container) {
		spans[0].focus();
		spans[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		const containerRect = container.getBoundingClientRect();

		const flatSelectionGroup = selectionGroup.flat();

		let count = 0;
		let increase = () => {
			let curCount = count;
			count++;
			return curCount;
		};

		return (
			<Layer {...props}>
				{wordRanges.map((range, index) =>
					flatSelectionGroup[index] === 1 ? (
						<BoundingRectRect
							xOffset={containerRect.x}
							yOffset={containerRect.y}
							boundingRect={range.getBoundingClientRect()}
							shadowBlur={5}
							stroke={color}
							opacity={0.3}
							key={increase()}
						></BoundingRectRect>
					) : null
				)}
			</Layer>
		);
	}

	return null;
}
