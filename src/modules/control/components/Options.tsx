import { useSelector, useDispatch } from "react-redux";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { Divider, Menu, MenuItem, IconButton, Typography } from "@material-ui/core";
import { changeDocument, downloadDBData } from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import display from "../../display";
import db from "../../db";
import { DocumentData } from "../../db/model";

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
				<Typography>{label}</Typography>
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
				<Typography>{label}</Typography>
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

export const Options = () => {
	const activeDocument = useSelector(display.selectors.getPDFName);
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
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<Typography>Active Document:</Typography>
				<Typography>{activeDocument?.replace(".pdf", "")}</Typography>
				<Divider />
				<Typography>Documents with existing data:</Typography>
				<Typography>
					<ul>{documents.map((document) => (document ? <li>{document.replace(".pdf", "")}</li> : null))}</ul>
				</Typography>
				<Divider />
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<MenuItem
					onClick={() => {
						dispatch(downloadDBData());
						handleClose();
					}}
				>
					Download document datasets
				</MenuItem>
				<Divider />
				<InputDataSets handleClose={handleClose} label={"Upload document datasets"}></InputDataSets>
			</Menu>
		</div>
	);
};
