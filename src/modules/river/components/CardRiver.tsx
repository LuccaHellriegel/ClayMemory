import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { CardConfig, RiverMakeUps, QACardContent } from "../model";
import { getAll } from "../selectors";
import { incrementer } from "../../../shared/utils";
import { HybridCardField } from "./HybridCardField";

const NoteCard = ({ content }: { content: string }) => {
	return (
		<HybridCardField
			storeValue={content}
			fullWidth
			label="Note"
			variant="filled"
			style={{ backgroundColor: "#CBF3F0" }}
			InputLabelProps={{ style: { color: "#000000" } }}
		></HybridCardField>
	);
};

const QACard = ({ content }: { content: QACardContent }) => {
	return (
		<Grid container direction="column" spacing={1}>
			<Grid item>
				<HybridCardField
					storeValue={content.q}
					fullWidth
					label={"Question"}
					variant="filled"
					style={{ backgroundColor: "#FFBF69" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
			</Grid>
			<Grid item>
				<HybridCardField
					storeValue={content.a}
					fullWidth
					label={"Answer"}
					variant="filled"
					style={{ backgroundColor: "#2EC4B6" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
			</Grid>
		</Grid>
	);
};

const Card = ({ config }: { config: CardConfig }) => {
	switch (config.type) {
		case "Note":
			return <NoteCard content={config.content as string}></NoteCard>;
		case "Q-A":
			return <QACard content={config.content as { q: string; a: string }}></QACard>;
	}
};

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
