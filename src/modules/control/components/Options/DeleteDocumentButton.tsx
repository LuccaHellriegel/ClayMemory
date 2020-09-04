import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import text from "../../../text";
import { deleteDocument } from "../../actions";

const DeleteDocumentDialogAlert = ({
	document,
	handleClose,
	open,
}: {
	document: string;
	handleClose: () => void;
	open: boolean;
}) => {
	const dispatch = useDispatch();

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Delete " + document + " and all associated card data?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">This change can not be undone.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Abort
				</Button>
				<Button
					onClick={() => {
						dispatch(deleteDocument(document));
						handleClose();
					}}
					color="primary"
					autoFocus
				>
					Delete document and associated card data
				</Button>
			</DialogActions>
		</Dialog>
	);
};

//TODO-NICE: deleting the active document leads only to reset it, not really delete it
export const DeleteDocumentButton = ({ document }: { document: string }) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Tooltip
				title={text.constants.deleteDocumentTooltip}
				enterDelay={text.constants.defaultEnterDelay}
				enterNextDelay={text.constants.defaultEnterNextDelay}
			>
				<IconButton
					type="button"
					onClick={() => {
						setOpen(true);
					}}
				>
					<DeleteIcon fontSize="small"></DeleteIcon>
				</IconButton>
			</Tooltip>
			<DeleteDocumentDialogAlert document={document} open={open} handleClose={handleClose}></DeleteDocumentDialogAlert>
		</div>
	);
};
