import { useDispatch } from "react-redux";
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import display from "../../display";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteDocumentTooltip } from "../../../shared/tooltips";

//TODO-NICE: deleting the active document leads only to reset it, not really delete it
export const DeleteDocumentButton = ({ document }: { document: string }) => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={deleteDocumentTooltip} enterDelay={500} enterNextDelay={1000}>
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
