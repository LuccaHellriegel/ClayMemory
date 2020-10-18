import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import pdf from "../../../pdf";
import selection from "../../../selection";
import { View } from "../../model";
import { getCurrentView } from "../../selectors";
import { RiverMaterialPairList } from "../RiverMaterialPairList/RiverMaterialPairList";
import { RiverExplorer } from "./RiverExplorer";

export const Display = () => {
	const currentView = useSelector(getCurrentView);

	// TODO: cant hide the CardExplorer because the Material UI TextField does not render correctly
	// after hidding

	// TODO: disable CardExplorer until I fix the "which River is active" problem for that view
	return (
		<Fragment>
			<div hidden={currentView !== View.RiverMaterial} style={{ width: "100%", height: "100%" }}>
				<pdf.components.PDFDocument ChildComponent={RiverMaterialPairList}></pdf.components.PDFDocument>
				<pdf.components.OriginMarkedSnackbar></pdf.components.OriginMarkedSnackbar>
			</div>

			<div hidden={currentView !== View.RiverExplorer} style={{ width: "100%", height: "100%" }}>
				<RiverExplorer></RiverExplorer>
			</div>

			{/* {currentView === View.CardExplorer && <CardExplorer></CardExplorer>} */}

			<selection.components.ContextMenu></selection.components.ContextMenu>
			<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
		</Fragment>
	);
};
