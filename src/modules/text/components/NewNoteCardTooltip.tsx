import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { newNoteCardTooltip, defaultEnterDelay, defaultEnterNextDelay } from "../constants";

export const NewNoteCardTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<Tooltip title={newNoteCardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</Tooltip>
	);
};
