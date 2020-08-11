import React, { useLayoutEffect, useState, RefObject } from "react";
import { Stage } from "react-konva";
import { WordLayer } from "./WordLayer";
import { getOverlayRelevantData, selectionTypeIsSection } from "../selectors";
import { SectionMovementState } from "../model";
import analyze from "../../analyze";
import { rectHeight } from "../../../shared/rect";
import { useSelector } from "react-redux";

const freeColor = "green";
const lockedColor = "red";

function DocumentCanvas({
	spanGroup,
	movementState,
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
	const showRects = useSelector(selectionTypeIsSection);

	useLayoutEffect(() => {
		if (documentRef.current) {
			setHeight(rectHeight((documentRef.current as HTMLDivElement).getBoundingClientRect()));
		}
	}, [documentRef]);

	return (
		<Stage width={parentSize.width} height={height} style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}>
			{documentRef.current && (
				<WordLayer
					showRects={showRects}
					container={documentRef.current as HTMLDivElement}
					spanGroup={spanGroup}
					color={movementState === "FREE" ? freeColor : lockedColor}
				></WordLayer>
			)}
		</Stage>
	);
}

export const DocumentCanvasContainer = analyze.components.DataGuardHOC(DocumentCanvas, getOverlayRelevantData);
