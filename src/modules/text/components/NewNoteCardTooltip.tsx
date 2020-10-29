import React, { ReactElement } from "react";
import { newNoteCardTooltip, defaultEnterDelay, defaultEnterNextDelay } from "../constants";
import { BiggerTooltip } from "./BiggerTooltip";

export const NewNoteCardTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<BiggerTooltip title={newNoteCardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</BiggerTooltip>
	);
};
