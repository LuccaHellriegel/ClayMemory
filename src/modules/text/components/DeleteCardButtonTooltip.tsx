import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { defaultEnterDelay, defaultEnterNextDelay, deleteCardTooltip } from "../constants";

export const DeleteCardButtonTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<Tooltip title={deleteCardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</Tooltip>
	);
};
