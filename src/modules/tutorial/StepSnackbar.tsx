import React, { useEffect } from "react";
import { Snackbar, IconButton, Typography, Card, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getStep } from "./selectors";
import CloseIcon from "@material-ui/icons/Close";
import { actions } from "./slice";
import pdf from "../pdf";
import text from "../text";
import cards from "../cards";
import selection from "../selection";
import { SelectionExistingCardTargetConfig } from "../selection/model";

const useSteps = (step: number) => {
	const dispatch = useDispatch();
	const pdfFile = useSelector(pdf.selectors.getPDF);
	const pdfPages = useSelector(pdf.selectors.getTotalPages);

	const cardObject = useSelector(cards.selectors.getCards);
	const cardEntries = Object.entries(cardObject);
	const qaCards = cardEntries.filter((arr) => arr[1].type === "Q-A");
	const qaCardExists = qaCards.length > 0;

	const qaCardsAnswerIsFilled = qaCards.filter((arr) => cards.model.content.cardHasFullAField(arr[1])).length > 0;

	const selWithOriginExists = useSelector(selection.selectors.getSourceConfig)?.contentOrigin;

	const targetConfig = useSelector(selection.selectors.getTargetConfig);
	const qFieldIsReplaceTarget =
		targetConfig &&
		(targetConfig as SelectionExistingCardTargetConfig).updateType &&
		(targetConfig as SelectionExistingCardTargetConfig).updateType === "REPLACE";

	const qaCardsFieldsAreFilled = qaCards.filter((arr) => cards.model.content.cardHasFullQAFields(arr[1])).length > 0;

	const sourceConfig = useSelector(selection.selectors.getSourceConfig);
	const qFieldIsProbablySource = sourceConfig && sourceConfig.contentOrigin;

	// TODO: this is quite buggy (endless loop between some states), need clearer state flow

	useEffect(() => {
		if (pdfFile === null) {
			dispatch(actions.step(1));
		} else {
			switch (step) {
				case 1:
					if (pdfFile && pdfPages > 1) {
						dispatch(actions.step(2));
					}
					break;
				case 2:
					if (qaCardExists) {
						dispatch(actions.step(3));
					}
					break;
				case 3:
					if (!qaCardExists) {
						dispatch(actions.step(2));
					} else if (selWithOriginExists) {
						dispatch(actions.step(4));
					}
					break;
				case 4:
					if (!selWithOriginExists && !qaCardsAnswerIsFilled) {
						dispatch(actions.step(3));
					} else {
						dispatch(actions.step(5));
					}
					break;
				case 5:
					if (!qaCardsAnswerIsFilled) {
						dispatch(actions.step(4));
					} else if (qFieldIsReplaceTarget) {
						dispatch(actions.step(6));
					}
					break;
				case 6:
					if (!qFieldIsReplaceTarget) {
						dispatch(actions.step(5));
					} else if (qaCardsFieldsAreFilled) {
						dispatch(actions.step(7));
					}
					break;
				case 7:
					if (!qaCardsFieldsAreFilled) {
						dispatch(actions.step(6));
					} else if (qFieldIsProbablySource) {
						dispatch(actions.step(8));
					}
					break;
			}
		}
	}, [
		dispatch,
		pdfFile,
		pdfPages,
		qaCardExists,
		selWithOriginExists,
		qaCardsAnswerIsFilled,
		qFieldIsReplaceTarget,
		qaCardsFieldsAreFilled,
		qFieldIsProbablySource,
		step,
	]);
};

const messageMap: { [numb: number]: string } = {
	1: "This tutorial teaches you all the ways to use ClayMemory! If you want to follow the tutorial, carefully execute the steps. The tutorial is rudimentary and does not react perfectly if something is executed out of order. First: Load a pdf with more than one page (next step is loaded automatically).",
	2: "Create a QA-card in any CardRiver (e.g. CardRiver 1).",
	3: "Select any text in the PDF.",
	4: "Add the text to the QA-card Answer/A-field via either the Append-button or the Replace-button next to the field.",
	5: "Mark the Q-field of the QA-card by pressing the Replace-button next to it.",
	6: "Select any text in the PDF again. This text will replace the Q-field.",
	7: "Select any text in the Q-field. Make sure to only let the left mouse button go, while the cursor is over the text-field!",
	8: "",
};

export const Tutorial = () => {
	const step = useSelector(getStep);
	return step !== null ? <StepSnackbar step={step}></StepSnackbar> : null;
};

export const StepSnackbar = ({ step }: { step: number }) => {
	const dispatch = useDispatch();

	const close = () => {
		dispatch(actions.step(null));
	};

	const handleClose = (_: any, reason: string) => {
		if (reason === "clickaway") {
			return;
		} else {
			close();
		}
	};

	useSteps(step);

	return (
		<Snackbar
			anchorOrigin={{ vertical: step !== 1 ? "bottom" : "top", horizontal: "center" }}
			open={true}
			onClose={handleClose}
			message={
				<Grid>
					<Card
						variant="outlined"
						color="secondary"
						style={{ padding: "4px", color: "black", backgroundColor: "white" }}
						square={true}
					>
						<Typography variant="h4">{"Tutorial: Step " + step}</Typography>
					</Card>

					<Card variant="outlined" style={{ padding: "4px", color: "white", backgroundColor: "#3f51b5" }} square={true}>
						<Typography variant="body1">{messageMap[step]}</Typography>
					</Card>
				</Grid>
			}
			action={
				<text.components.BiggerTooltip
					title={"Close Tutorial"}
					enterDelay={text.constants.defaultEnterDelay}
					enterNextDelay={text.constants.defaultEnterNextDelay}
				>
					<IconButton size="small" aria-label="close" color="inherit" onClick={close}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</text.components.BiggerTooltip>
			}
		/>
	);
};
