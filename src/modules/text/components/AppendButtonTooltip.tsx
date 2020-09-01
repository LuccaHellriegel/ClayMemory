import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { defaultEnterDelay, defaultEnterNextDelay, appendToCardTooltip } from "../constants";

export const AppendButtonTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<Tooltip title={appendToCardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</Tooltip>
	);
};
