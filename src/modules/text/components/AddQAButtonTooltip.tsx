import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { defaultEnterDelay, defaultEnterNextDelay, newQACardTooltip } from "../constants";

export const AddQAButtonTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<Tooltip title={newQACardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</Tooltip>
	);
};
