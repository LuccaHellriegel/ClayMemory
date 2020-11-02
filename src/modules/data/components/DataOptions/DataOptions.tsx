import React from "react";
import { Divider, Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DocumentOptionList } from "./DocumentOptionList";
import { ActiveDocumentOptionItem } from "./ActiveDocumentOptionItem";
import { InputDocument } from "../DocumentData/InputDocument";

export const DataOptions = () => {
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
					<DownloadDataSetsButton></db.components.DownloadDataSetsButton>
				</MenuItem>
				<Divider />
				<InputDataSetsButton handleClose={handleClose} label={text.constants.uploadDatasetsText}></InputDataSetsButton> */}
			</Menu>
		</div>
	);
};
