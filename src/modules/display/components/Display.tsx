import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { View } from "../model";
import { getCurrentView } from "../selectors";
import { CardExplorer } from "./CardExplorer";
import { PDFDocument } from "./PDFDocument/PDFDocument";
import { RiverExplorer } from "./RiverExplorer";

export const Display = () => {
	const currentView = useSelector(getCurrentView);

	// console.log(currentView);

	// switch (currentView) {
	// 	case View.RiverMaterial:
	// 		return <PDFDocument></PDFDocument>;
	// 	case View.RiverExplorer:
	// 		return <RiverExplorer></RiverExplorer>;
	// 	case View.CardExplorer:
	// 		return <CardExplorer></CardExplorer>;
	// }

	return (
		<Fragment>
			<div hidden={currentView !== View.RiverMaterial} style={{ width: "100%", height: "100%" }}>
				<PDFDocument></PDFDocument>
			</div>

			<div hidden={currentView !== View.RiverExplorer} style={{ width: "100%", height: "100%" }}>
				<RiverExplorer></RiverExplorer>
			</div>

			<div hidden={currentView !== View.CardExplorer} style={{ width: "100%", height: "100%" }}>
				<CardExplorer></CardExplorer>
			</div>
		</Fragment>
	);
};
