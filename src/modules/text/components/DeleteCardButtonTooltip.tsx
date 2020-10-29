import React, { ReactElement } from "react";
import { defaultEnterDelay, defaultEnterNextDelay, deleteCardTooltip } from "../constants";
import { BiggerTooltip } from "./BiggerTooltip";

export const DeleteCardButtonTooltip = ({ children }: { children: ReactElement }) => {
	return (
		<BiggerTooltip title={deleteCardTooltip} enterDelay={defaultEnterDelay} enterNextDelay={defaultEnterNextDelay}>
			{children}
		</BiggerTooltip>
	);
};
