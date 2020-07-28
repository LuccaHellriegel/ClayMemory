import React from "react";
import { Stage } from "react-konva";
import { connect } from "react-redux";
import { WordLayer } from "./WordLayer";
import { getOverlayRelevantData } from "../selectors";
import { SectionMovementState } from "../model";
import analyze from "../../analyze";

const freeColor = "green";
const lockedColor = "red";

function DocumentCanvas({
	spanGroup,
	movementState,
	selectionGroup,
	wordRangeGroup,
	parentSize,
}: {
	spanGroup?: HTMLSpanElement[];
	movementState?: SectionMovementState;
	selectionGroup?: (0 | 1)[][];
	wordRangeGroup?: Range[][];
	parentSize: { width: number };
}) {
	//zIndex is Ordering of canvases
	return (
		<Stage
			width={parentSize.width}
			height={document.documentElement.scrollHeight}
			style={{ position: "absolute", pointerEvents: "none", zIndex: 100000 }}
		>
			{spanGroup && wordRangeGroup && (
				<WordLayer
					spanGroup={spanGroup}
					color={movementState === "FREE" ? freeColor : lockedColor}
					selectionGroup={selectionGroup}
					wordRangeGroup={wordRangeGroup}
				></WordLayer>
			)}
		</Stage>
	);
}

export const DocumentCanvasContainer = connect(analyze.utils.createDataConditionalSelector(getOverlayRelevantData))(
	DocumentCanvas
);
