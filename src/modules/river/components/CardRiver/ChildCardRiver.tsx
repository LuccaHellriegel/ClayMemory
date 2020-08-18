import { CardConfig } from "../../../cards/model";
import { toCardGridItemsWithDividers } from "./toCardGridItemsWithDividers";
import { useMemo } from "react";
import { CardRiverAccordion } from "./CardRiverAccordion";
import React from "react";
import { useSelector } from "react-redux";
import { getRiverContentState } from "../../selectors";

//TODO-RC: make Card-River non-overlapping and scroll the cards that we are considering from the Menus into view
//TODO-NICE: untangle these components, dont need to so many subs?

export const ChildCardRiver = ({ riverID, riverCards }: { riverID: string; riverCards: CardConfig[] }) => {
	const riverContentState = useSelector(getRiverContentState);

	// this should only change if the store values change
	const gridItems = useMemo(() => {
		let inputCards = riverCards;

		if (riverContentState !== "ALL") {
			if (riverContentState === "QAS") {
				inputCards = riverCards.filter((config) => config.type === "Q-A");
			}
			if (riverContentState === "NOTES") {
				inputCards = riverCards.filter((config) => config.type === "Note");
			}
		}

		return toCardGridItemsWithDividers(inputCards, riverID);
	}, [riverCards, riverID, riverContentState]);

	return <CardRiverAccordion riverID={riverID} gridItems={gridItems} summary={riverID}></CardRiverAccordion>;
};
