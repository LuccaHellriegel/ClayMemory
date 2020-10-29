import { useSelector } from "react-redux";
import React from "react";
import { Divider, Menu, MenuItem, IconButton, Typography, Card, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import pdf from "../../../pdf";
import db from "../../../db";
import { DeleteDocumentButton } from "./DeleteDocumentButton";
import text from "../../../text";
import { incrementer } from "../../../../shared/utils";
import { InputDataSets } from "./InputDataSets";
import { InputDocument } from "./InputDocument";
import { DocumentOptionItem } from "./DocumentOptionItem";

const ActiveDocumentOptionItem = ({ afterClick }: { afterClick: () => void }) => {
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

const DocumentOptionList = ({ afterClick }: { afterClick: () => void }) => {
	const activeDocument = useSelector(pdf.selectors.getPDFName);
	const documents = useSelector(db.selectors.getDocumentNames).filter((doc) => doc !== activeDocument);
	const increment = incrementer();

	return (
		<span>
			{documents.length > 0 && [
				<Typography key={increment()} component={"span"} variant="h6">
					{text.constants.existingDataText}
				</Typography>,
				<Typography key={increment()} component={"span"}>
					<ul style={{ listStyleType: "square" }}>
						{documents.map((document) =>
							document ? (
								<li key={increment()}>
									<DocumentOptionItem
										document={document}
										afterClick={afterClick}
										key={increment()}
									></DocumentOptionItem>
								</li>
							) : null
						)}
					</ul>
				</Typography>,
				// <Divider key={increment()} style={{ marginTop: "6px" }} />,
			]}
		</span>
	);
};

export const Options = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	//TODO: snackbar for loading documents etc. needs some thought for state to avoid prop drilling like with afterClick

	return (
		<div>
			<IconButton type="button" onClick={handleClick}>
				<MoreVertIcon></MoreVertIcon>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{ style: { paddingLeft: "8px", paddingRight: "8px" } }}
			>
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<ActiveDocumentOptionItem afterClick={handleClose}></ActiveDocumentOptionItem>
				<DocumentOptionList afterClick={handleClose}></DocumentOptionList>
				{/* <MenuItem
					onClick={() => {
						handleClose();
					}}
				>
					<db.components.DownloadDBDataButton></db.components.DownloadDBDataButton>
				</MenuItem>
				<Divider />
				<InputDataSets handleClose={handleClose} label={text.constants.uploadDatasetsText}></InputDataSets> */}
			</Menu>
		</div>
	);
};
