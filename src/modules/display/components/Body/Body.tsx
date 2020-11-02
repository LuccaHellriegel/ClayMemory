import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import selection from "../../../selection";
import { View } from "../../model";
import { getCurrentView } from "../../selectors";
import { RiverMaterial } from "./RiverMaterial/RiverMaterial";
import { RiverExplorer } from "./RiverExplorer";

export const Body = () => {
	const currentView = useSelector(getCurrentView);

	// TODO: cant hide the CardExplorer because the Material UI TextField does not render correctly
	// after hidding
	// TODO: disable CardExplorer until I fix the "which River is active" problem for that view
	return (
		<Fragment>
			<div hidden={currentView !== View.RiverMaterial} style={{ width: "100%", height: "100%" }}>
				<RiverMaterial></RiverMaterial>
			</div>

			<div hidden={currentView !== View.RiverExplorer} style={{ width: "100%", height: "100%" }}>
				<RiverExplorer></RiverExplorer>
			</div>

			<selection.components.ContextMenu></selection.components.ContextMenu>
			<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
		</Fragment>
	);
};
