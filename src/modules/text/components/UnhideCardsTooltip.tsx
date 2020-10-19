import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { defaultEnterDelay, defaultEnterNextDelay, unhideCardsTooltip } from "../constants";

export const UnhideCardsTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<Tooltip title={unhideCardsTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</Tooltip>
	);
};
