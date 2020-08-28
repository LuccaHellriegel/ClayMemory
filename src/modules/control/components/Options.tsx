import { useSelector, useDispatch } from "react-redux";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { Divider, Menu, MenuItem, IconButton, Typography, Card, Button, Tooltip, Grid } from "@material-ui/core";
import { changeDocument, downloadDBData } from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import display from "../../display";
import db from "../../db";
import { DocumentData } from "../../db/model";
import { uploadDatasetsText, existingDataText, downloadDatasetsText } from "../../../shared/text";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { DeleteDocumentButton } from "./DeleteDocumentButton";

//TODO-NICE: have way to merge two document-workspaces

const InputDocument = ({ handleClose, label }: any) => {
	const dispatch = useDispatch();

	const ref: MutableRefObject<null | HTMLInputElement> = useRef(null);

	return (
		<Fragment>
			<MenuItem
				onClick={() => {
					(ref.current as HTMLInputElement).click();
				}}
			>
				<Button
					variant="contained"
					color="primary"
					disableElevation
					startIcon={<InsertDriveFileIcon></InsertDriveFileIcon>}
				>
					{label}
				</Button>
			</MenuItem>
			<input
				ref={ref}
				style={{ display: "none" }}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const files = event.target.files;
					const pdf = files ? files[0] : null;
					if (pdf) {
						dispatch(changeDocument(pdf));
					}
					handleClose();
				}}
				type="file"
				accept=".pdf"
			/>
		</Fragment>
	);
};

//TODO-RC:
const LoadDocumentDataButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={""} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					// dispatch(ActionCreators.undo());
				}}
			>
				<ImportContactsIcon fontSize="small"></ImportContactsIcon>
			</IconButton>
		</Tooltip>
	);
};

const InputDataSets = ({ handleClose, label }: any) => {
	const dispatch = useDispatch();

	const activeDocument = useSelector(display.selectors.getPDFName);

	const ref: MutableRefObject<null | HTMLInputElement> = useRef(null);

	return (
		<Fragment>
			<MenuItem
				onClick={() => {
					(ref.current as HTMLInputElement).click();
				}}
			>
				<Button variant="contained" color="primary" disableElevation startIcon={<PublishIcon></PublishIcon>}>
					{label}
				</Button>
			</MenuItem>
			<input
				ref={ref}
				style={{ display: "none" }}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					// fun fact: uploading a file with the same file-name does not trigger this event

					const files = event.target.files;
					const file = files ? files[0] : null;
					if (file) {
						const reader = new FileReader();
						reader.readAsText(file);
						reader.onload = () => {
							//TODO-NICE: sanitize, escape os new line difference, prepare multimedia cards
							//TODO-NICE: merge same name-pdfs and think about collision in general
							//TODO-NICE: merge uploaded state with current-one and dont overwrite

							const uploadedDataSets = JSON.parse(reader.result as string);
							// if the uploaded dataset corresponds to the current document, overwrite current with uploaded
							const foundDataSet = (uploadedDataSets as DocumentData[]).find(
								(dbData) => dbData.name === activeDocument
							);
							dispatch(db.actions.loadDocumentDataSets(uploadedDataSets, foundDataSet));
						};
					}
					handleClose();
				}}
				type="file"
				accept=".txt"
			/>
		</Fragment>
	);
};

const DocumentListItem = ({ document }: { document: string }) => {
	return (
		<li>
			<Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
				<Grid item>{document.replace(".pdf", "")}</Grid>

				<Grid item>
					<Card variant="outlined">
						<Grid container direction="row">
							<Grid item>
								<LoadDocumentDataButton></LoadDocumentDataButton>
							</Grid>

							<Grid item>
								<Divider orientation="vertical"></Divider>
							</Grid>

							<Grid item>
								<DeleteDocumentButton document={document}></DeleteDocumentButton>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
		</li>
	);
};

export const Options = () => {
	const documents = useSelector(db.selectors.getDocumentNames);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

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
				<Typography variant="h6">{existingDataText}</Typography>
				<Typography>
					<ul style={{ listStyleType: "square" }}>
						{documents.map((document) => (document ? <DocumentListItem document={document}></DocumentListItem> : null))}
					</ul>
				</Typography>
				<Divider style={{ marginTop: "6px" }} />
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<MenuItem
					onClick={() => {
						dispatch(downloadDBData());
						handleClose();
					}}
				>
					<Button variant="contained" color="primary" disableElevation startIcon={<GetAppIcon></GetAppIcon>}>
						{downloadDatasetsText}
					</Button>
				</MenuItem>
				<Divider />
				<InputDataSets handleClose={handleClose} label={uploadDatasetsText}></InputDataSets>
			</Menu>
		</div>
	);
};
