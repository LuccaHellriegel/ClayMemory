import { CardConfig } from "../../cards/model";
import { toCardGridItemsWithDividers } from "./toCardGridItemsWithDividers";
import { useMemo } from "react";
import { CardRiverAccordion } from "./CardRiverAccordion";
import React from "react";

export const ChildCardRiver = ({ riverID, riverCards }: { riverID: string; riverCards: CardConfig[] }) => {
	// this should only change if the store values change
	const gridItems = useMemo(() => toCardGridItemsWithDividers(riverCards, riverID), [riverCards, riverID]);

	return riverCards.length > 0 ? (
		<CardRiverAccordion gridItems={gridItems} summary={riverID}></CardRiverAccordion>
	) : null;
};
