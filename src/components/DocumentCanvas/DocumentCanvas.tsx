import React from "react";
import { Stage } from "react-konva";
import { connect } from "react-redux";
import { WordLayer } from "./WordLayer";
import { SectionSelectionState } from "../Control/ControlActionsReducers";

const freeColor = "green";
const lockedColor = "red";

function DocumentCanvas({
	spans,
	selectionState,
}: {
	spans?: HTMLSpanElement[];
	selectionState: SectionSelectionState;
}) {
	//zIndex is Ordering of canvases
	return (
		<Stage
			width={window.innerWidth}
			height={document.documentElement.scrollHeight}
			style={{ position: "absolute", pointerEvents: "none", zIndex: 100000 }}
		>
			{spans && <WordLayer spans={spans} color={selectionState === "free" ? freeColor : lockedColor}></WordLayer>}
		</Stage>
	);
}

function mapStateToProps(state: any) {
	if (state.pageData.spanGroups) {
		return { spans: state.pageData.spanGroups[state.section.curIndex], selectionState: state.section.selectionState };
	}
	return {};
}

export const DocumentCanvasContainer = connect(mapStateToProps)(DocumentCanvas);
