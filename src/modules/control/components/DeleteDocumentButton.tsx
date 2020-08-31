import { useDispatch } from "react-redux";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import display from "../../display";
import DeleteIcon from "@material-ui/icons/Delete";
import text from "../../text";

//TODO-NICE: deleting the active document leads only to reset it, not really delete it
export const DeleteDocumentButton = ({ document }: { document: string }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.deleteDocumentTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(display.actions.deleteDocument(document));
				}}
			>
				<DeleteIcon fontSize="small"></DeleteIcon>
			</IconButton>
		</Tooltip>
	);
};
