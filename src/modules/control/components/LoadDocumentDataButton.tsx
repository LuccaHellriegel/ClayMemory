import { useDispatch } from "react-redux";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { loadSavedDocument } from "../actions";
import { loadSavedDocumentTooltip } from "../../../shared/tooltips";
export const LoadDocumentDataButton = ({ document }: { document: string }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={loadSavedDocumentTooltip} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(loadSavedDocument(document));
				}}
			>
				<ImportContactsIcon fontSize="small"></ImportContactsIcon>
			</IconButton>
		</Tooltip>
	);
};
