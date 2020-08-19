import { useSelector, useDispatch } from "react-redux";
import { getDocumentNames } from "../selectors";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { Divider, Menu, MenuItem, IconButton } from "@material-ui/core";
import { changeDocument, loadDocumentDataSets, downloadDBData } from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DocumentData } from "../model";
import display from "../../display";
import cards from "../../cards";

//TODO-NICE: have way to merge two document-workspaces

export const InputDocument = ({ handleClose, label }: any) => {
	const dispatch = useDispatch();

	const ref: MutableRefObject<null | HTMLInputElement> = useRef(null);

	return (
		<Fragment>
			<MenuItem
				onClick={() => {
					(ref.current as HTMLInputElement).click();
				}}
			>
				{label}
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

export const InputDataSets = ({ handleClose, label }: any) => {
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
				{label}
			</MenuItem>
			<input
				ref={ref}
				style={{ display: "none" }}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const files = event.target.files;
					const file = files ? files[0] : null;
					if (file) {
						const reader = new FileReader();
						reader.readAsText(file);
						reader.onload = () => {
							//TODO-NICE: sanitize, escape os new line difference, prepare multimedia cards
							//TODO-NICE: merge same name-pdfs and think about collision in general

							const uploadedDataSets = JSON.parse(reader.result as string);
							dispatch(loadDocumentDataSets(uploadedDataSets));

							const foundDataSet = (uploadedDataSets as DocumentData[]).find(
								(dbData) => dbData.name === activeDocument
							);
							//TODO-RC: merge this with loadDocument because I only allow load document to be undone

							if (foundDataSet) {
								//TODO-NICE: merge uploaded state with current-one and dont overwrite
								// if the uploaded dataset corresponds to the current document, overwrite current with uploaded
								dispatch({ type: cards.actionTypes.GLOBAL_RESET, payload: foundDataSet });
							}
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
	const documents = useSelector(getDocumentNames);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

	return (
		<div style={{ minWidth: 160 }}>
			<IconButton type="button" onClick={handleClick}>
				<MoreVertIcon></MoreVertIcon>
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				Active Document:
				<br></br>
				{activeDocument?.replace(".pdf", "")}
				<br></br>
				<br></br>
				<Divider />
				<br></br>
				Documents with existing data:
				<ul>{documents.map((document) => (document ? <li>{document.replace(".pdf", "")}</li> : null))}</ul>
				<br></br>
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
