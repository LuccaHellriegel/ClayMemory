import { useSelector, useDispatch } from "react-redux";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { MenuItem, Button } from "@material-ui/core";
import display from "../../../display";
import db from "../../../db";
import { DocumentData } from "../../../db/model";
import PublishIcon from "@material-ui/icons/Publish";

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
