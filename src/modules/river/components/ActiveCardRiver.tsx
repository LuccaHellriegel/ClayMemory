import React from "react";
import { useSelector } from "react-redux";
import { getActiveRiverCards, getActiveRiverMakeUpID } from "../selectors";
import { ChildCardRiver } from "./ChildCardRiver";

//TODO: mark cards that are hovered over in the contextmenu, so that we see where the content would end up
// canvas?

//TODO: selection in CardRiver should stay highlighted when the contextMenu opens?

//TODO: contextMenu as permant element, maybe sidebar? Selected String in ContextMenu to show what was selected?

export const ActiveCardRiver = () => {
	const riverID = useSelector(getActiveRiverMakeUpID);
	const riverCards = useSelector(getActiveRiverCards);

	return <ChildCardRiver riverID={riverID} riverCards={riverCards}></ChildCardRiver>;
};
