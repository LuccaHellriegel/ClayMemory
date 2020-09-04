import React, { useState, useLayoutEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import { PDFDocumentContainer } from "./PDFDocument/PDFDocument";
import { useSelector, useDispatch } from "react-redux";
import { getMaterialHeight, getPDF } from "../selectors";
import { setMaterialHeight } from "../actions";
import { PDFViewer } from "./PDFDocument/PDFViewer";

function MaterialDisplayColumn({ size, hidden }: any) {
	const [elevation, setElevation] = useState(3);

	const dispatch = useDispatch();

	const materialHeight = useSelector(getMaterialHeight);

	useLayoutEffect(() => {
		// first setting
		if (!materialHeight) {
			dispatch(setMaterialHeight(size.height));
		}

		// setting if changed
		if (materialHeight && materialHeight !== size.height) {
			dispatch(setMaterialHeight(size.height));
		}
	}, [dispatch, materialHeight, size.height]);

	const pdf = useSelector(getPDF);

	return (
		<Grid
			item
			style={{
				width: "60%",
			}}
			onMouseEnter={() => {
				setElevation(20);
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
			hidden={hidden}
		>
			<Paper elevation={elevation}>
				<PDFDocumentContainer parentSize={size}></PDFDocumentContainer>
				{pdf.pdf && false && <PDFViewer pdfFile={pdf.pdf}></PDFViewer>}
			</Paper>
		</Grid>
	);
}

export const MaterialDisplayColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	MaterialDisplayColumn
);
