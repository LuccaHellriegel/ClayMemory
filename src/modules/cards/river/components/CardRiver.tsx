import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { TextareaAutosize } from "@material-ui/core";
import { connect } from "react-redux";
import { CardConfig, RiverMakeUp } from "../model";
import { getAll } from "../selectors";

const BaseCard = ({ title, children }: { title: string; children: any }) => {
	return (
		<Accordion>
			<AccordionSummary>{title}</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
};

const NoteCard = ({ content }: { content: string }) => {
	return (
		<BaseCard title={"Note"}>
			<TextareaAutosize value={content}></TextareaAutosize>
		</BaseCard>
	);
};

const NamedItemField = ({ name, content }: { name: string; content: string }) => {
	return (
		<Grid item>
			{name}:<br></br>
			<TextareaAutosize value={content}></TextareaAutosize>
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

const ClozeCard = ({ content }: { content: string }) => {
	return (
		<BaseCard title={"Cloze"}>
			<TextareaAutosize value={content}></TextareaAutosize>
		</BaseCard>
	);
};

const Card = ({ config }: { config: CardConfig }) => {
	switch (config.type) {
		case "Note":
			return <NoteCard content={config.content as string}></NoteCard>;
		case "Q-A":
			return <QACard content={config.content as { q: string; a: string }}></QACard>;
		case "Cloze":
			return <ClozeCard content={config.content as string}></ClozeCard>;
	}
};

const CardRiver = ({ index, riverMakeUps }: { index: number; riverMakeUps?: RiverMakeUp[] }) => {
	return riverMakeUps ? (
		<Accordion>
			<AccordionSummary>CardRiver</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					{riverMakeUps[index] &&
						riverMakeUps[index].map((card) => (
							<Grid item>
								<Card config={card}></Card>
							</Grid>
						))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	) : null;
};

export const CardRiverContainer = connect(getAll)(CardRiver);
