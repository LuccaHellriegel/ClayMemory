import React, { ReactElement } from "react";
import { defaultEnterDelay, defaultEnterNextDelay, unhideCardsTooltip } from "../constants";
import { BiggerTooltip } from "./BiggerTooltip";

export const UnhideCardsTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<BiggerTooltip title={unhideCardsTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</BiggerTooltip>
	);
};
