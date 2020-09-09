import { Typography, Divider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRiverContentState, getRiverContentFilter, getActiveRiverMakeUpID } from "../../selectors";
import cards from "../../../cards";
import { NoteConfig, QAConfig, CardConfig } from "../../../cards/model/model-config";
import { ContentFilter, pageNumberToRiverMakeUpID } from "../../model";
import { toCardGridItemsWithDividers } from "./toCardGridItemsWithDividers";

//TODO-NICE: make it not be accordion but closeable?
//TODO-NICE: make local show / hide notes
//TODO-NICE: untangle these components, dont need to so many subs?

const noteContainsContentFilter = (noteConfig: NoteConfig, contentFilter: ContentFilter) =>
	noteConfig.content.includes(contentFilter);

const qaContainsContentFilter = (qaConfig: QAConfig, contentFilter: ContentFilter) =>
	qaConfig.content.a.includes(contentFilter) || qaConfig.content.q.includes(contentFilter);

export const CardRiver = ({
	riverID,
	riverCards,
	materialHeight,
}: {
	riverID: string;
	riverCards: CardConfig[];
	materialHeight: number;
}) => {
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

	useEffect(() => {
		if (riverID === pageNumberToRiverMakeUpID(1)) console.log("rendering " + riverID, materialHeight);
	});

	//TODO-RC: perf is really bad with 200+ pages, need to prevent re-renders for everything in the middle

	const dispatch = useDispatch();

	//TODO-NICE: make HalfFull-sub-menu for half-full QAs
	//TODO-NICE: if you start without any document and then load one, the current cards should be merged into that one
	//TODO-NICE: scroll-to-top for overflowing river

	return (
		<Accordion
			defaultExpanded={true}
			//TODO-NICE: I use 1400 to prevent non-overflow on reloading (the site would be stretched)
			// if the river is bigger than the pdf-page would be, then the site is stretchted and the pdf-page-element assumes the size of the river
			// this solution assumes the pdf page is always bigger than 1400 (true on 22'), need solution to get height of pdf-page-element itself and not its parent
			style={{
				overflowY: "auto",
				maxHeight: materialHeight,
			}}
			elevation={5}
		>
			<AccordionSummary>
				<Typography
					variant="h6"
					align="center"
					style={{ MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" }}
				>
					{riverID}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					<Grid item>
						<cards.components.AddQAButton></cards.components.AddQAButton>
						<cards.components.AddNoteButton></cards.components.AddNoteButton>
						<Divider></Divider>
					</Grid>

					<Grid item>
						<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
							{gridItems}
						</Grid>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};
