import { useDispatch } from "react-redux";
import { trySetActiveRiver } from "../actions";
import { ReactNode } from "react";
import React from "react";

//TODO-NICE: selection in CardRiver should stay highlighted when the contextMenu opens?

//TODO-NICE: contextMenu as permant element, maybe sidebar?
//TODO-NICE: preview in ContextMenu of how selected string would be used

//TODO-NICE: make River-View, where you can just see one card and can make it smaller? Maybe just button to zoom "in" / just seeing the current river
//TODO-NICE: mark Origin-Span or maybe rect over whole page-section?
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
