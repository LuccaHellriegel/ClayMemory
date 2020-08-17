import { useSelector, useDispatch } from "react-redux";
import { getDocumentNames } from "../selectors";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { Divider, Menu, MenuItem, IconButton } from "@material-ui/core";
import { changeDocument } from "../actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

export const DocumentChooser = () => {
	const documents = useSelector(getDocumentNames);

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
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<br></br>
				Documents with existing data:
				<ul>{documents.map((document) => (document ? <li>{document.replace(".pdf", "")}</li> : null))}</ul>
			</Menu>
		</div>
	);
};
