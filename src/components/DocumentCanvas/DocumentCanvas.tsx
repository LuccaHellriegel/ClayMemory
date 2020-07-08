import React from "react";
import { Stage } from "react-konva";
import { connect } from "react-redux";
import { WordLayer } from "./WordLayer";

//TODO: resize event!

export function DocumentCanvas({ spans }: { spans?: HTMLSpanElement[] }) {
	//zIndex is Ordering of canvases

	//console.log(spans);
	return (
		<Stage
			width={window.innerWidth}
			height={window.innerHeight}
			style={{ position: "absolute", pointerEvents: "none", zIndex: 100000 }}
		>
			{spans && <WordLayer spans={spans}></WordLayer>}
		</Stage>
	);
}

function mapStateToProps(state: any) {
	if (state.pageData.spanGroups) {
		console.log(state.pageData, state.section);
		return { spans: state.pageData.spanGroups[state.section.curIndex] };
	}
	return {};
}

export const DocumentCanvasContainer = connect(mapStateToProps)(DocumentCanvas);
