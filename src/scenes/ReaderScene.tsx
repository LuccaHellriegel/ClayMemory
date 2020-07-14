import React from "react";
import Grid from "@material-ui/core/Grid";
import { PDFDocumentContainer } from "../components/Reader/Reader";
import { withSize } from "react-sizeme";
import { PDFUploadContainer } from "../components/PDFUpload/PDFUpload";
import { DocumentCanvasContainer } from "../components/DocumentCanvas/DocumentCanvas";
import { ReaderControlContainer } from "../components/ReaderControl/ReaderControl";
import Paper from "@material-ui/core/Paper";
import { CardRiverContainer } from "../components/CardRiver/CardRiver";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
				height: "100%",
			}}
		>
			<Paper elevation={3}>{children}</Paper>
		</Grid>
	);
}

function ReaderSceneMaterialColumn({ size }: any) {
	return (
		<Grid
			item
			style={{
				width: "60%",
			}}
		>
			<Paper elevation={3}>
				<DocumentCanvasContainer parentSize={size}></DocumentCanvasContainer>
				<PDFDocumentContainer parentSize={size}></PDFDocumentContainer>
				<PDFUploadContainer></PDFUploadContainer>
				<ReaderControlContainer></ReaderControlContainer>
			</Paper>
		</Grid>
	);
}

const ReaderSceneMaterialColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	ReaderSceneMaterialColumn
);

export function ReaderScene() {
	return (
		<div>
			<Grid container justify="space-around" direction="row" alignItems="stretch">
				<ReaderSceneGridColumn>
					<CardRiverContainer index={0}></CardRiverContainer>
				</ReaderSceneGridColumn>
				<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
				<ReaderSceneGridColumn>
					<CardRiverContainer index={1}></CardRiverContainer>
				</ReaderSceneGridColumn>
			</Grid>
		</div>
	);
}
