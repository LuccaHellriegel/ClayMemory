import { Typography, Divider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { trySetPushToRiver } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getPushToRiver } from "../../selectors";
import display from "../../../display";
import focus from "../../../focus";
import cards from "../../../cards";

//TODO-NICE: make it not be accordion but closeable?
//TODO-NICE: make local show / hide notes
export const CardRiverAccordion = ({
	riverID,
	gridItems,
	summary,
}: {
	riverID: string;
	gridItems: any;
	summary: string;
}) => {
	const defaultElevation = 3;
	const highlightElevation = 20;
	const [elevation, setElevation] = useState(defaultElevation);
	const pushToRiver = useSelector(getPushToRiver);

	if (riverID === pushToRiver && elevation === defaultElevation) {
		setElevation(highlightElevation);
	} else if (riverID !== pushToRiver && elevation !== defaultElevation) {
		setElevation(defaultElevation);
	}

	const materialHeight = useSelector(display.selectors.getMaterialHeight);
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);

	const dispatch = useDispatch();

	//TODO-NICE: make HalfFull-sub-menu for half-full QAs
	//TODO-NICE: if you start without any document and then load one, the current cards should be merged into that one
	//TODO-NICE: scroll-to-top for overflowing river
	return (
		<Accordion
			defaultExpanded={true}
			onMouseEnter={() => {
				dispatch(trySetPushToRiver(riverID));
			}}
			elevation={elevation}
			//TODO-NICE: I use 1400 to prevent non-overflow on reloading (the site would be stretched)
			// if the river is bigger than the pdf-page would be, then the site is stretchted and the pdf-page-element assumes the size of the river
			// this solution assumes the pdf page is always bigger than 1400 (true on 22'), need solution to get height of pdf-page-element itself and not its parent
			style={
				displayFocus === "ACTIVE_RIVER"
					? {
							overflowY: "auto",
							maxHeight: materialHeight ? materialHeight : "1400px",
					  }
					: {}
			}
		>
			<AccordionSummary>
				<Typography
					variant="h6"
					align="center"
					style={{ MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" }}
				>
					{summary}
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
