import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { trySetPushToRiver } from "../actions";
import { useDispatch } from "react-redux";
import { AddNoteButton } from "./AddNoteButton";
import { AddQAButton } from "./AddQAButton";

//TODO-NICE: make it not be accordion but closeable?

export const CardRiverAccordion = ({
	riverID,
	gridItems,
	summary,
}: {
	riverID: string;
	gridItems: any;
	summary: string;
}) => {
	const [elevation, setElevation] = useState(3);
	const dispatch = useDispatch();
	return (
		<Accordion
			defaultExpanded={true}
			onMouseEnter={() => {
				setElevation(20);
				dispatch(trySetPushToRiver(riverID));
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
			elevation={elevation}
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
						<AddQAButton></AddQAButton>
						<AddNoteButton></AddNoteButton>
					</Grid>
					{gridItems}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};
