import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Divider, Menu, MenuItem, IconButton, Typography, Card, Button, Grid } from "@material-ui/core";
import { downloadDBData } from "../../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import display from "../../../display";
import db from "../../../db";
import GetAppIcon from "@material-ui/icons/GetApp";
import { DeleteDocumentButton } from "./DeleteDocumentButton";
import text from "../../../text";
import { incrementer } from "../../../../shared/utils";
import { InputDataSets } from "./InputDataSets";
import { InputDocument } from "./InputDocument";
import { DocumentOptionItem } from "./DocumentOptionItem";

const ActiveDocumentOptionItem = ({ document }: { document: string }) => {
	return (
		<Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
			<Grid item>{document.replace(".pdf", "")}</Grid>

			<Grid item>
				<Card variant="outlined">
					<DeleteDocumentButton document={document}></DeleteDocumentButton>
				</Card>
			</Grid>
		</Grid>
	);
};

export const Options = () => {
	const activeDocument = useSelector(display.selectors.getPDFName);
	const documents = useSelector(db.selectors.getDocumentNames).filter((doc) => doc !== activeDocument);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

	const increment = incrementer();

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
				{activeDocument && [
					<Typography key={increment()} component={"span"} variant="h6">
						{text.constants.activeDocumentText}
					</Typography>,
					<ActiveDocumentOptionItem key={increment()} document={activeDocument}></ActiveDocumentOptionItem>,
					<Divider key={increment()} style={{ marginTop: "6px" }}></Divider>,
				]}
				{documents.length > 0 && [
					<Typography key={increment()} component={"span"} variant="h6">
						{text.constants.existingDataText}
					</Typography>,
					<Typography key={increment()} component={"span"}>
						<ul style={{ listStyleType: "square" }}>
							{documents.map((document) =>
								document ? (
									<li key={increment()}>
										<DocumentOptionItem document={document} key={increment()}></DocumentOptionItem>
									</li>
								) : null
							)}
						</ul>
					</Typography>,
					<Divider key={increment()} style={{ marginTop: "6px" }} />,
				]}
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<MenuItem
					onClick={() => {
						dispatch(downloadDBData());
						handleClose();
					}}
				>
					<Button variant="contained" color="primary" disableElevation startIcon={<GetAppIcon></GetAppIcon>}>
						{text.constants.downloadDatasetsText}
					</Button>
				</MenuItem>
				<Divider />
				<InputDataSets handleClose={handleClose} label={text.constants.uploadDatasetsText}></InputDataSets>
			</Menu>
		</div>
	);
};
