import { useDispatch } from "react-redux";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { loadSavedDocument } from "../actions";
import text from "../../text";
export const LoadDocumentDataButton = ({ document }: { document: string }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.loadSavedDocumentTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
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
