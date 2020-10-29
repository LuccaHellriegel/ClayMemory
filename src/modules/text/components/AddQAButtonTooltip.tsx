import React, { ReactElement } from "react";
import { defaultEnterDelay, defaultEnterNextDelay, newQACardTooltip } from "../constants";
import { BiggerTooltip } from "./BiggerTooltip";

export const AddQAButtonTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<BiggerTooltip title={newQACardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</BiggerTooltip>
	);
};
