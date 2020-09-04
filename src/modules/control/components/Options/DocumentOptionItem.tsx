import React from "react";
import { Divider, Card, Grid } from "@material-ui/core";
import { DeleteDocumentButton } from "./DeleteDocumentButton";
import { LoadDocumentDataButton } from "./LoadDocumentDataButton";

const DocumentOptionItemButtonRow = ({ document }: { document: string }) => {
	return (
		<Grid container direction="row">
			<Grid item>
				<LoadDocumentDataButton document={document}></LoadDocumentDataButton>
			</Grid>

			<Grid item>
				<Divider orientation="vertical"></Divider>
			</Grid>

			<Grid item>
				<DeleteDocumentButton document={document}></DeleteDocumentButton>
			</Grid>
		</Grid>
	);
};

export const DocumentOptionItem = ({ document }: { document: string }) => {
	return (
		<Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
			<Grid item>{document.replace(".pdf", "")}</Grid>

			<Grid item>
				<Card variant="outlined">
					<DocumentOptionItemButtonRow document={document}></DocumentOptionItemButtonRow>
				</Card>
			</Grid>
		</Grid>
	);
};
