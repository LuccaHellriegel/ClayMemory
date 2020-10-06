import { Grid } from "@material-ui/core";
import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { incrementer } from "../../../shared/utils";
import cards from "../../cards";
import { CardConfig, NoteConfig, QAConfig } from "../../cards/model/config";
import river from "../../river";

const ClayCardExplorerGridItems = (cards: CardConfig[]) => {
	const increment = incrementer();

	return cards.reduce((prev, currentCard) => {
		prev.push(
			<Grid item key={increment()} xs={5}>
				<river.components.ClayCard config={currentCard} key={increment()}></river.components.ClayCard>
			</Grid>
		);
		return prev;
	}, [] as any[]);
};

export const CardExplorer = () => {
	const cardObjects = useSelector(river.selectors.getNonEmptyRiverCardsSorted);
	const riverContentState = useSelector(river.selectors.getRiverContentState);

	//TODO: use regex for upper/lower-case
	const contentFilter = useSelector(river.selectors.getRiverContentFilter);

	const gridItems = useMemo(() => {
		let inputCards = cardObjects;

		if (riverContentState === "NONE") {
			return [];
		}

		if (riverContentState !== "ALL") {
			if (riverContentState === "QAS") {
				inputCards = cardObjects.filter((config) => config.type === "Q-A");
			}
			if (riverContentState === "NOTES") {
				inputCards = cardObjects.filter((config) => config.type === "Note");
			}
		}
		//TODO: optimize this waste, move this out of the memo as it changes more rapidly
		if (contentFilter !== "")
			inputCards = inputCards.filter((card) => {
				switch (card.type) {
					case "Note":
						return cards.model.content.noteContentContainsStringOrEmpty(card as NoteConfig, contentFilter);
					case "Q-A":
						return cards.model.content.qaContentContainsStringOrEmpty(card as QAConfig, contentFilter);
				}
				return false;
			});

		return ClayCardExplorerGridItems(inputCards);
	}, [cardObjects, riverContentState, contentFilter]);

	return (
		<Grid
			container
			justify="space-evenly"
			alignItems="flex-start"
			spacing={2}
			style={{ margin: "6px", width: "100%", height: "100%" }}
		>
			{gridItems}
		</Grid>
	);
};
