import { CardConfig } from "../../cards/model";
import { toCardGridItemsWithDividers } from "./toCardGridItemsWithDividers";
import { useMemo } from "react";
import { CardRiverAccordion } from "./CardRiverAccordion";
import React from "react";

//TODO-RC: make Card-River non-overlapping and scroll the cards that we are considering from the Menus into view

export const ChildCardRiver = ({ riverID, riverCards }: { riverID: string; riverCards: CardConfig[] }) => {
	// this should only change if the store values change
	const gridItems = useMemo(() => toCardGridItemsWithDividers(riverCards, riverID), [riverCards, riverID]);

	return <CardRiverAccordion riverID={riverID} gridItems={gridItems} summary={riverID}></CardRiverAccordion>;
};
