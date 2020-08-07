import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useState, useMemo } from "react";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getActiveRiverCards, getActiveRiverMakeUpID } from "../selectors";
import { incrementer } from "../../../shared/utils";
import { Card } from "./Card";
import { CardConfig } from "../../cards/model";

//TODO: mark cards that are hovered over in the contextmenu, so that we see where the content would end up
// canvas?

//TODO: selection in CardRiver should stay highlighted when the contextMenu opens?

//TODO: contextMenu as permant element, maybe sidebar? Selected String in ContextMenu to show what was selected?

const GridDivider = () => (
	<Grid item>
		<Divider></Divider>
	</Grid>
);

const toCardGridItemsWithDividers = (cards: CardConfig[], riverID: string) => {
	const increment = incrementer();

	return cards.reduce((prev, currentCard, index, arr) => {
		prev.push(
			<Grid item key={increment()}>
				<Card config={currentCard} riverID={riverID} key={increment()}></Card>
			</Grid>
		);

		const notLastCard = index < arr.length - 1;
		if (notLastCard) prev.push(<GridDivider key={increment()}></GridDivider>);
		return prev;
	}, [] as any[]);
};

export const CardRiver = () => {
	const [elevation, setElevation] = useState(3);
	const riverID = useSelector(getActiveRiverMakeUpID);
	const riverCards = useSelector(getActiveRiverCards);

	// this should only re-render if the store values change
	const gridItems = useMemo(() => toCardGridItemsWithDividers(riverCards, riverID), [riverCards, riverID]);

	return riverCards ? (
		<Accordion
			defaultExpanded={true}
			onMouseEnter={() => {
				setElevation(20);
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
			elevation={elevation}
		>
			<AccordionSummary>CardRiver</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					{gridItems}
				</Grid>
			</AccordionDetails>
		</Accordion>
	) : null;
};
