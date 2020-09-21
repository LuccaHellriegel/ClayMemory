import { useDispatch } from "react-redux";
import { trySetActiveRiver } from "../actions";
import { ReactNode } from "react";
import React from "react";

//TODO-NICE: make reconciliation algorithm for origin when new PDF versions come out
// (basically, just search the text, and if it is not in the same span, just move the span - expand page forward and backward then search there)

export const SwitchActiveRiver = ({ children, riverID }: { children: ReactNode; riverID: string }) => {
	const dispatch = useDispatch();

	return (
		<span
			onMouseEnter={() => {
				dispatch(trySetActiveRiver(riverID));
			}}
		>
			{children}
		</span>
	);
};
