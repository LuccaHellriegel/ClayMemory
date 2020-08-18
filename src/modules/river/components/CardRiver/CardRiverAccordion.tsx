import { Typography, Divider } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { trySetPushToRiver } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { AddNoteButton } from "./Buttons/AddNoteButton";
import { AddQAButton } from "./Buttons/AddQAButton";
import { getPushToRiver } from "../../selectors";

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

	const dispatch = useDispatch();
	return (
		<Accordion
			defaultExpanded={true}
			onMouseEnter={() => {
				dispatch(trySetPushToRiver(riverID));
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
						<Divider></Divider>
					</Grid>
					{gridItems}
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};
