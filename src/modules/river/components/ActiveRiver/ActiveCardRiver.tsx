import React from "react";
import { useSelector } from "react-redux";
import { getActiveRiverCards, getActiveRiverMakeUpID } from "../../selectors";
import { ChildCardRiver } from "../CardRiver/ChildCardRiver";

//TODO-RC: selection in CardRiver should stay highlighted when the contextMenu opens?

//TODO-NICE: contextMenu as permant element, maybe sidebar?
//TODO-NICE: preview in ContextMenu of how selected string would be used

//TODO-RC: SummaryNotes (maybe just SummaryRiver but with filter clickable?)
export const ActiveCardRiver = () => {
	const riverID = useSelector(getActiveRiverMakeUpID);
	const riverCards = useSelector(getActiveRiverCards);

	return <ChildCardRiver riverID={riverID} riverCards={riverCards}></ChildCardRiver>;
};
