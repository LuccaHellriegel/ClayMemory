import { useDispatch } from "react-redux";
import React, { ChangeEvent, Fragment, useRef, MutableRefObject } from "react";
import { MenuItem, Button } from "@material-ui/core";
import { changeDocument } from "../../actions";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
//TODO: have way to merge two document-workspaces
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
