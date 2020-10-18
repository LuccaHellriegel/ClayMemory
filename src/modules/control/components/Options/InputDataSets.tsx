import { useSelector, useDispatch } from "react-redux";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject, useState } from "react";
import {
	MenuItem,
	Button,
	DialogActions,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import db from "../../../db";
import { DocumentData } from "../../../db/model";
import pdf from "../../../pdf";
import { replaceActiveAppState } from "../../actions";

export const InputDataSets = ({ handleClose, label }: any) => {
	const ref: MutableRefObject<null | HTMLInputElement> = useRef(null);

	const [file, setFile] = useState<File | undefined>();

	const handleDialogClose = () => {
		handleClose();
		setFile(undefined);
	};

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
						setFile(file);
					}
				}}
				type="file"
				accept=".txt"
			/>
			<LoadDataSetsDialogAlert
				handleClose={handleDialogClose}
				open={!!file}
				file={(file as unknown) as File}
			></LoadDataSetsDialogAlert>
		</Fragment>
	);
};

const LoadDataSetsDialogAlert = ({
	handleClose,
	open,
	file,
}: {
	handleClose: () => void;
	open: boolean;
	file: File;
}) => {
	const dispatch = useDispatch();
	const activeDocument = useSelector(pdf.selectors.getPDFName);
	console.log(open, file);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Load the uploaded dataset?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					This overwrites existing data of the uploaded document-datasets and can not be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Abort
				</Button>
				<Button
					onClick={() => {
						const reader = new FileReader();
						reader.readAsText(file);
						reader.onload = () => {
							//TODO: sanitize, escape os new line difference, prepare multimedia cards
							//TODO: merge same name-pdfs and think about collision in general
							//TODO: merge uploaded state with current-one and dont overwrite
							const uploadedDataSets = JSON.parse(reader.result as string) as DocumentData[];
							// if the uploaded dataset corresponds to the current document, overwrite current with uploaded
							const foundDataSet = (uploadedDataSets as DocumentData[]).find(
								(dbData) => dbData.name === activeDocument
							);

							dispatch(db.actions.updateDocumentDB(uploadedDataSets));
							if (foundDataSet) {
								replaceActiveAppState(dispatch, foundDataSet);
							}
							handleClose();
						};
					}}
					color="primary"
					autoFocus
				>
					Load datasets and possibly overwrite existing data
				</Button>
			</DialogActions>
		</Dialog>
	);
};
