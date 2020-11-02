import React, { Fragment } from "react";
import pdf from "../../../../pdf";
import { RiverMaterialPairList } from "./RiverMaterialPairList";

export const RiverMaterial = () => (
	<Fragment>
		<pdf.components.PDFDocument ChildComponent={RiverMaterialPairList}></pdf.components.PDFDocument>
		<pdf.components.OriginMarkedSnackbar></pdf.components.OriginMarkedSnackbar>
	</Fragment>
);
