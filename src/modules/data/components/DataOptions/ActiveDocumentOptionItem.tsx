import { useSelector } from "react-redux";
import React from "react";
import { Divider, Typography, Card, Grid } from "@material-ui/core";
import pdf from "../../../pdf";
import text from "../../../text";
import { incrementer } from "../../../../shared/utils";
import { DeleteDocumentButton } from "../DocumentData/DeleteDocumentButton";

export const ActiveDocumentOptionItem = ({ afterClick }: { afterClick: () => void }) => {
	const activeDocument = useSelector(pdf.selectors.getPDFName);
	const increment = incrementer();

	return (
		<span>
			{activeDocument && [
				<Typography key={increment()} component={"span"} variant="h6">
					{text.constants.activeDocumentText}
				</Typography>,
				<Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
					<Grid item>{activeDocument.replace(".pdf", "")}</Grid>

					<Grid item>
						<Card variant="outlined">
							<DeleteDocumentButton document={activeDocument} afterClick={afterClick}></DeleteDocumentButton>
						</Card>
					</Grid>
				</Grid>,
				<Divider key={increment()} style={{ marginTop: "6px" }}></Divider>,
			]}
		</span>
	);
};
