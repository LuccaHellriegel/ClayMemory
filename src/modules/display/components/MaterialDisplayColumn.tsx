import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withSize } from "react-sizeme";
import Paper from "@material-ui/core/Paper";
import focus from "../../focus";
import { useDispatch } from "react-redux";
import { PDFDocumentContainer } from "./PDFDocument/PDFDocument";

function MaterialDisplayColumn({ size, hidden }: any) {
	const dispatch = useDispatch();

	const [elevation, setElevation] = useState(3);

	return (
		<Grid
			item
			style={{
				width: "60%",
			}}
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("SELECTION"));
				setElevation(20);
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
			hidden={hidden}
		>
			<Paper elevation={elevation}>
				<PDFDocumentContainer parentSize={size}></PDFDocumentContainer>
			</Paper>
		</Grid>
	);
}

export const MaterialDisplayColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	MaterialDisplayColumn
);
