import React, { useLayoutEffect, useState, RefObject } from "react";
import { Stage } from "react-konva";
import { WordLayer } from "./WordLayer";
import { getOverlayRelevantData } from "../selectors";
import { SectionMovementState } from "../model";
import analyze from "../../analyze";
import { rectHeight } from "../../../shared/rect";

const freeColor = "green";
const lockedColor = "red";

function DocumentCanvas({
	spanGroup,
	movementState,
	selectionGroup,
	wordRangeGroup,
	parentSize,
	documentRef,
}: {
	spanGroup: HTMLSpanElement[];
	movementState: SectionMovementState;
	selectionGroup: (0 | 1)[][];
	wordRangeGroup: Range[][];
	parentSize: { width: number };
	documentRef: RefObject<any>;
}) {
	const [height, setHeight] = useState(1);

	useLayoutEffect(() => {
		if (documentRef.current) {
			setHeight(rectHeight((documentRef.current as HTMLDivElement).getBoundingClientRect()));
		}
	}, [documentRef.current]);

	return (
		<Stage width={parentSize.width} height={height} style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}>
			<WordLayer
				spanGroup={spanGroup}
				color={movementState === "FREE" ? freeColor : lockedColor}
				selectionGroup={selectionGroup}
				wordRangeGroup={wordRangeGroup}
			></WordLayer>
		</Stage>
	);
}

export const DocumentCanvasContainer = analyze.components.DataGuardHOC(DocumentCanvas, getOverlayRelevantData);
