import { useSelector, useDispatch } from "react-redux";
import { getDocumentNames, getDocumentDataSets } from "../selectors";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { Divider, Menu, MenuItem, IconButton } from "@material-ui/core";
import { changeDocument, loadDocumentDataSets } from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const fileDownload = require("js-file-download");
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

//TODO-NICE: sanitize, escape os new line difference, prepare multimedia cards

export const InputDataSets = ({ handleClose, label }: any) => {
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
					const file = files ? files[0] : null;
					if (file) {
						const reader = new FileReader();
						reader.readAsText(file);
						reader.onload = () => {
							dispatch(loadDocumentDataSets(JSON.parse(reader.result as string)));
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
	const documents = useSelector(getDocumentNames);
	const documentDataSets = useSelector(getDocumentDataSets);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div style={{ minWidth: 160 }}>
			<IconButton type="button" onClick={handleClick}>
				<MoreVertIcon></MoreVertIcon>
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				Documents with existing data:
				<ul>{documents.map((document) => (document ? <li>{document.replace(".pdf", "")}</li> : null))}</ul>
				<br></br>
				<Divider />
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<MenuItem
					onClick={() => {
						const localString = new Date().toLocaleString();
						fileDownload(JSON.stringify(documentDataSets), localString + " ClayMemory.txt");
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
