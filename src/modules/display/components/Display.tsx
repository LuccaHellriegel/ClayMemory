import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { View } from "../model";
import { getCurrentView } from "../selectors";
import { CardExplorer } from "./CardExplorer";
import { OriginMarkedSnackbar } from "./OriginMarkedSnackbar";
import { PDFDocument } from "./PDFDocument/PDFDocument";
import { RiverExplorer } from "./RiverExplorer";

export const Display = () => {
	const currentView = useSelector(getCurrentView);

	// TODO: cant hide the CardExplorer because the Material UI TextField does not render correctly
	// after hidding

	// TODO: disable CardExplorer until I fix the "which River is active" problem for that view
	return (
		<Fragment>
			<div hidden={currentView !== View.RiverMaterial} style={{ width: "100%", height: "100%" }}>
				<PDFDocument></PDFDocument>
				<OriginMarkedSnackbar></OriginMarkedSnackbar>
			</div>

			<div hidden={currentView !== View.RiverExplorer} style={{ width: "100%", height: "100%" }}>
				<RiverExplorer></RiverExplorer>
			</div>

			{/* {currentView === View.CardExplorer && <CardExplorer></CardExplorer>} */}
		</Fragment>
	);
};
