import React from "react";
import { Divider, Menu, MenuItem, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DocumentOptionList } from "./DocumentOptionList";
import { ActiveDocumentOptionItem } from "./ActiveDocumentOptionItem";
import { InputDocument } from "../DocumentData/InputDocument";
import { DownloadDataSetsButton } from "../DataSets/DownloadDataSetsButton";
import { InputDataSetsButton } from "../DataSets/InputDataSetsButton";
import text from "../../../text";
import { useDispatch } from "react-redux";
import tutorial from "../../../tutorial";

export const DataOptions = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();

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
				<ActiveDocumentOptionItem afterClick={handleClose}></ActiveDocumentOptionItem>
				<DocumentOptionList afterClick={handleClose}></DocumentOptionList>
				<Divider />
				<InputDocument handleClose={handleClose} label={"Load document"}></InputDocument>
				<Divider />
				<InputDataSetsButton handleClose={handleClose} label={text.constants.uploadDatasetsText}></InputDataSetsButton>
				<Divider />
				<MenuItem
					onClick={() => {
						handleClose();
					}}
				>
					<DownloadDataSetsButton></DownloadDataSetsButton>
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={() => {
						handleClose();
					}}
				>
					<span
						onClick={() => {
							dispatch(tutorial.actions.step(1));
						}}
					>
						<Button variant="contained" color="primary" disableElevation>
							{"Start Tutorial"}
						</Button>
					</span>
				</MenuItem>
			</Menu>
		</div>
	);
};
