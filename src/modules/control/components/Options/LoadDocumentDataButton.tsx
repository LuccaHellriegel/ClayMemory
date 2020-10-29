import { useDispatch } from "react-redux";
import React from "react";
import { IconButton } from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { loadSavedDocument } from "../../actions";
import text from "../../../text";

export const LoadDocumentDataButton = ({ document, afterClick }: { document: string; afterClick: () => void }) => {
	const dispatch = useDispatch();
	return (
		<text.components.BiggerTooltip
			title={text.constants.loadSavedDocumentTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(loadSavedDocument(document));
					afterClick();
				}}
			>
				<ImportContactsIcon fontSize="small"></ImportContactsIcon>
			</IconButton>
		</text.components.BiggerTooltip>
	);
};
