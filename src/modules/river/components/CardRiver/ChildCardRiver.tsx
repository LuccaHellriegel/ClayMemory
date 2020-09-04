import { CardConfig, NoteConfig, QAConfig } from "../../../cards/model/model-config";
import { toCardGridItemsWithDividers } from "./toCardGridItemsWithDividers";
import { useMemo } from "react";
import { CardRiverAccordion } from "./CardRiverAccordion";
import React from "react";
import { useSelector } from "react-redux";
import { getRiverContentState, getRiverContentFilter } from "../../selectors";
import { ContentFilter } from "../../model";

//TODO-NICE: untangle these components, dont need to so many subs?

const noteContainsContentFilter = (noteConfig: NoteConfig, contentFilter: ContentFilter) =>
	noteConfig.content.includes(contentFilter);

const qaContainsContentFilter = (qaConfig: QAConfig, contentFilter: ContentFilter) =>
	qaConfig.content.a.includes(contentFilter) || qaConfig.content.q.includes(contentFilter);

export const ChildCardRiver = ({ riverID, riverCards }: { riverID: string; riverCards: CardConfig[] }) => {
	const riverContentState = useSelector(getRiverContentState);

	//TODO-NICE: use regex for upper/lower-case
	const contentFilter = useSelector(getRiverContentFilter);

	// this should only change if the store values change
	const gridItems = useMemo(() => {
		let inputCards = riverCards;

		if (riverContentState === "NONE") {
			return [];
		}

		if (riverContentState !== "ALL") {
			if (riverContentState === "QAS") {
				inputCards = riverCards.filter((config) => config.type === "Q-A");
			}
			if (riverContentState === "NOTES") {
				inputCards = riverCards.filter((config) => config.type === "Note");
			}
		}
		//TODO-NICE: optimize this waste, move this out of the memo as it changes more rapidly
		if (contentFilter !== "")
			inputCards = inputCards.filter((card) => {
				switch (card.type) {
					case "Note":
						return noteContainsContentFilter(card as NoteConfig, contentFilter);
					case "Q-A":
						return qaContainsContentFilter(card as QAConfig, contentFilter);
				}
				return false;
			});

		return toCardGridItemsWithDividers(inputCards, riverID);
	}, [riverCards, riverID, riverContentState, contentFilter]);

	return <CardRiverAccordion riverID={riverID} gridItems={gridItems} summary={riverID}></CardRiverAccordion>;
};
