import { useDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import React from "react";
import { getActiveRiverMakeUpID } from "../../selectors";
import { actions } from "../../slice";

//TODO: make reconciliation algorithm for origin when new PDF versions come out
// (basically, just search the text, and if it is not in the same span, just move the span - expand page forward and backward then search there)

export const SwitchActiveRiver = ({ children, riverID }: { children: ReactNode; riverID: string }) => {
	const dispatch = useDispatch();
	const activeRiverID = useSelector(getActiveRiverMakeUpID);

	return (
		<span
			onMouseEnter={() => {
				if (activeRiverID !== riverID) {
					dispatch(actions.riverActiveID(riverID));
				}
			}}
		>
			{children}
		</span>
	);
};
