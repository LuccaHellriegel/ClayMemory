import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { CardConfig, RiverMakeUps } from "../model";
import { getAll } from "../selectors";
import { incrementer } from "../../../shared/utils";
import { Card } from "./Card";

const GridDivider = () => (
	<Grid item>
		<Divider></Divider>
	</Grid>
);

const toCardGridItemsWithDividers = (cards: CardConfig[], increment: () => number) => {
	return cards.reduce((prev, currentCard, index, arr) => {
		prev.push(
			<Grid item key={increment()}>
				<Card config={currentCard} key={increment()}></Card>
			</Grid>
		);

		const notLastCard = index < arr.length - 1;
		if (notLastCard) prev.push(<GridDivider key={increment()}></GridDivider>);
		return prev;
	}, [] as any[]);
};

const CardRiver = ({ id, riverMakeUps }: { id: string; riverMakeUps?: RiverMakeUps }) => {
	const increment = incrementer();
	return riverMakeUps ? (
		<Accordion defaultExpanded={true}>
			<AccordionSummary>CardRiver</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					{toCardGridItemsWithDividers(riverMakeUps[id].cards, increment)}
				</Grid>
			</AccordionDetails>
		</Accordion>
	) : null;
};

export const CardRiverContainer = connect(getAll)(CardRiver);
