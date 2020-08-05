import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TextField, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { CardConfig, RiverMakeUps } from "../model";
import { getAll } from "../selectors";
import { incrementer } from "../../../shared/utils";

const BaseCard = ({ title, children }: { title: string; children: any }) => {
	return (
		<div>
			{title}
			<br />
			{children}
		</div>
	);
};

const NoteCard = ({ content }: { content: string }) => {
	return (
		<BaseCard title={"Note"}>
			<TextField value={content} type="filled"></TextField>
		</BaseCard>
	);
};

const NamedItemField = ({ name, content }: { name: string; content: string }) => {
	return (
		<Grid item>
			<TextField label={name} value={content} type="filled"></TextField>
		</Grid>
	);
};

const QACard = ({ content }: { content: { q: string; a: string } }) => {
	return (
		<BaseCard title={"Q-A"}>
			<Grid container direction="column">
				<NamedItemField name={"Question"} content={content.q}></NamedItemField>
				<NamedItemField name={"Answer"} content={content.a}></NamedItemField>
			</Grid>
		</BaseCard>
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

const GridDivider = ({ key }: { key: number | string }) => (
	<Grid item key={key}>
		<Divider></Divider>
	</Grid>
);

const CardRiver = ({ id, riverMakeUps }: { id: string; riverMakeUps?: RiverMakeUps }) => {
	const increment = incrementer();
	return riverMakeUps ? (
		<Accordion defaultExpanded={true}>
			<AccordionSummary>CardRiver</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					{riverMakeUps[id].cards.reduce((prev, currentCard, index, arr) => {
						prev.push(
							<Grid item key={increment()}>
								<Card config={currentCard} key={increment()}></Card>
							</Grid>
						);
						if (index < arr.length - 1) prev.push(<GridDivider key={increment()}></GridDivider>);
						return prev;
					}, [] as any[])}
				</Grid>
			</AccordionDetails>
		</Accordion>
	) : null;
};

export const CardRiverContainer = connect(getAll)(CardRiver);
