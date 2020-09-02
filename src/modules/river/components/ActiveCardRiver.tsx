import React from "react";
import { useSelector } from "react-redux";
import { getActiveRiverCards, getActiveRiverMakeUpID } from "../selectors";
import { ChildCardRiver } from "./CardRiver/ChildCardRiver";

//TODO-NICE: selection in CardRiver should stay highlighted when the contextMenu opens?

//TODO-NICE: contextMenu as permant element, maybe sidebar?
//TODO-NICE: preview in ContextMenu of how selected string would be used

//TODO-NICE: make River-View, where you can just see one card and can make it smaller? Maybe just button to zoom "in" / just seeing the current river
//TODO-NICE: mark Origin-Span or maybe rect over whole page-section?
//TODO-NICE: make reconciliation algorithm for origin when new PDF versions come out

export const ActiveCardRiver = () => {
	const riverID = useSelector(getActiveRiverMakeUpID);
	const riverCards = useSelector(getActiveRiverCards);

	return <ChildCardRiver riverID={riverID} riverCards={riverCards}></ChildCardRiver>;
};
