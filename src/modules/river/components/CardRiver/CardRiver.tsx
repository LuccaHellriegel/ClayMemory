import { Typography, Divider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { getRiverContentState, getRiverContentFilter, getRiverMakeUps } from "../../selectors";
import cards from "../../../cards";
import { ClayCardGridItems } from "./ClayCardGridItems";
import { filterCardConfigs } from "../../services/filterCardConfigs";

export const CardRiver = ({ riverID, materialHeight }: { riverID: string; materialHeight: number }) => {
	const cardConfigs = useSelector(cards.selectors.getCards);

	const riverMakeUp = useSelector(getRiverMakeUps)[riverID];
	const riverCards = riverMakeUp ? riverMakeUp.cardIDs.map((id) => cardConfigs[id]) : [];
	const riverContentState = useSelector(getRiverContentState);
	//TODO: use regex for upper/lower-case
	const contentFilter = useSelector(getRiverContentFilter);

	const filteredConfigs = filterCardConfigs(riverCards, riverContentState, contentFilter);
	const gridItems = ClayCardGridItems(filteredConfigs);

	//TODO: if you start without any document and then load one, the current cards should be merged into that one
	//TODO: scroll-to-top for overflowing river

	return (
		<Accordion
			expanded
			defaultExpanded={true}
			style={{
				overflow: "auto",
				// this was maxHeight but then if we hide the Material an empty river looks weird
				// because it is surrounded by white-space
				height: materialHeight,
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
