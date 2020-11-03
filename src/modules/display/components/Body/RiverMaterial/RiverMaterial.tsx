import React, { Fragment } from "react";
import pdf from "../../../../pdf";
import { OriginMarkedSnackbar } from "./Origin/OriginMarkedSnackbar";
import { RiverMaterialPairList } from "./RiverMaterialPairList";

export const RiverMaterial = () => (
	<Fragment>
		<pdf.components.PDFDocument ChildComponent={RiverMaterialPairList}></pdf.components.PDFDocument>
		<OriginMarkedSnackbar></OriginMarkedSnackbar>
	</Fragment>
);
