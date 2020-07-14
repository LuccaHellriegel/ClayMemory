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
	selectionGroup,
}: {
	spans?: HTMLSpanElement[];
	selectionState: SectionSelectionState;
	selectionGroup: (0 | 1)[][];
}) {
	//zIndex is Ordering of canvases
	console.log(selectionGroup);
	return (
		<Stage
			width={window.innerWidth}
			height={document.documentElement.scrollHeight}
			style={{ position: "absolute", pointerEvents: "none", zIndex: 100000 }}
		>
			{spans && (
				<WordLayer
					spans={spans}
					color={selectionState === "free" ? freeColor : lockedColor}
					selectionGroup={selectionGroup}
				></WordLayer>
			)}
		</Stage>
	);
}

function mapStateToProps(state: any) {
	if (state.pageData.spanGroups) {
		return {
			spans: state.pageData.spanGroups[state.section.curIndex],
			selectionState: state.section.selectionState,
			selectionGroup: state.pageData.selectionGroups[state.section.curIndex],
		};
	}
	return {};
}

export const DocumentCanvasContainer = connect(mapStateToProps)(DocumentCanvas);
