import React from "react";
import Grid from "@material-ui/core/Grid";
import { PDFDocumentContainer } from "./Reader/Reader";
import { withSize } from "react-sizeme";
import { PDFUploadContainer } from "./PDFUpload/PDFUpload";
import { DocumentCanvasContainer } from "./DocumentCanvas/DocumentCanvas";
import { ReaderControlContainer } from "./ReaderControl/ReaderControl";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
				height: "100%",
				outline: "solid red",
			}}
		>
			{children}
		</Grid>
	);
}

function ReaderSceneMaterialColumn({ size }: any) {
	return (
		<Grid
			item
			style={{
				width: "60%",
				outline: "solid red",
			}}
		>
			<DocumentCanvasContainer></DocumentCanvasContainer>
			<PDFDocumentContainer parentSize={size}></PDFDocumentContainer>
			<PDFUploadContainer></PDFUploadContainer>
			<ReaderControlContainer></ReaderControlContainer>
		</Grid>
	);
}

const ReaderSceneMaterialColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	ReaderSceneMaterialColumn
);

export function ReaderScene() {
	return (
		<Grid container justify="space-around" direction="row">
			<ReaderSceneGridColumn>Bluä</ReaderSceneGridColumn>
			<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
			<ReaderSceneGridColumn>Bluä</ReaderSceneGridColumn>
		</Grid>
	);
}
