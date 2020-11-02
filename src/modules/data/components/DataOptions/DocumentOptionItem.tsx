import React from "react";
import { Divider, Card, Grid } from "@material-ui/core";
import { LoadDocumentDataButton } from "../DocumentData/LoadDocumentDataButton";
import { DeleteDocumentButton } from "../DocumentData/DeleteDocumentButton";

const DocumentOptionItemButtonRow = ({ document, afterClick }: { document: string; afterClick: () => void }) => {
	return (
		<Grid container direction="row">
			<Grid item>
				<LoadDocumentDataButton document={document} afterClick={afterClick}></LoadDocumentDataButton>
			</Grid>

			<Grid item>
				<Divider orientation="vertical"></Divider>
			</Grid>

			<Grid item>
				<DeleteDocumentButton document={document} afterClick={afterClick}></DeleteDocumentButton>
			</Grid>
		</Grid>
	);
};

export const DocumentOptionItem = ({ document, afterClick }: { document: string; afterClick: () => void }) => {
	return (
		<Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
			<Grid item>{document.replace(".pdf", "")}</Grid>

			<Grid item>
				<Card variant="outlined">
					<DocumentOptionItemButtonRow document={document} afterClick={afterClick}></DocumentOptionItemButtonRow>
				</Card>
			</Grid>
		</Grid>
	);
};
