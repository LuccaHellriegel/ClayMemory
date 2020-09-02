import Grid from "@material-ui/core/Grid";
import React, { useRef, useEffect, MutableRefObject } from "react";
import { HybridCardField } from "../HybridCardField";
import { QACardContent } from "../../../../cards/model/model-content";
import { SingleOrigin, QAOrigin, QOnlyQAOrigin, AOnlyQAOrigin } from "../../../../cards/model/model-origin";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import { isNullOrUndefined } from "util";
import { getHoveredCardData } from "../../../selectors";
import focus from "../../../../focus";
import { setSourceCard } from "../../../actions";
import { Card, Paper } from "@material-ui/core";
import { CardProps, borderStyle } from "./ClayCard";
import text from "../../../../text";
import { AppendButton } from "../Buttons/AppendButton";

//TODO-NICE:
// make dropdown / menu for selection to create card from selection snackbar?
// show if selection has origin / button jump to origin at snackbar?
// make REPLACE-button for River
// replace Context-Menu with APPEND/REPLACE button flow? / allow both?

//TODO-RC: use only right-click for context-menu (better for APPEND/REPLACE-button usage)
//TODO-RC: replace Focus-module with scoped listeners

//TODO-NICE: think of way to not have menu over the cards, because you cant read them this way? end of card?
//TODO-NICE: use dark color pallet (theme?)

export const QACard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id, field } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

	const ref: MutableRefObject<undefined | HTMLDivElement> = useRef();
	useEffect(() => {
		if (ref.current && isHoveredCard) {
			(ref.current as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	});

	return (
		<Card variant="elevation" elevation={5} ref={ref} style={{ padding: "3px" }}>
			<Grid container direction="row" justify="space-between">
				<Grid item>
					<Grid container direction="column" spacing={1}>
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
									<div style={isHoveredCard && field === "q" ? borderStyle : undefined}>
										<HybridCardField
											saveChanges={(value) => {
												dispatch(cards.actions.updateCardContent(value, config.cardID, "q", "REPLACE", config.origin));
											}}
											storeValue={(config.content as QACardContent).q}
											label={text.constants.questionText}
											variant="filled"
											style={{ backgroundColor: "#FFBF69" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											setSourceCard={() => {
												dispatch(setSourceCard("q", config.origin));
											}}
										></HybridCardField>
									</div>
								</Grid>

								<Grid item>
									<Paper variant="outlined">
										<Grid container direction="row">
											{isActiveRiver && (
												<AppendButton type={config.type} creationType="q" cardID={config.cardID}></AppendButton>
											)}
											{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="q"></GrabForFieldButton>}
											{config.origin && !isNullOrUndefined((config.origin as QOnlyQAOrigin).q?.spanIndex) && (
												<JumpToOriginButton
													cardOrigin={(config.origin as QAOrigin).q as SingleOrigin}
												></JumpToOriginButton>
											)}
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
									<div style={isHoveredCard && field === "a" ? borderStyle : undefined}>
										<HybridCardField
											saveChanges={(value) => {
												dispatch(cards.actions.updateCardContent(value, config.cardID, "a", "REPLACE", config.origin));
											}}
											storeValue={(config.content as QACardContent).a}
											label={text.constants.answerText}
											style={{ backgroundColor: "#2EC4B6" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											setSourceCard={() => {
												dispatch(setSourceCard("a", config.origin));
											}}
										></HybridCardField>
									</div>
								</Grid>
								<Grid item>
									<Paper variant="outlined">
										<Grid container direction="row">
											{isActiveRiver && (
												<AppendButton type={config.type} creationType="a" cardID={config.cardID}></AppendButton>
											)}

											{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="a"></GrabForFieldButton>}
											{config.origin && !isNullOrUndefined((config.origin as AOnlyQAOrigin).a?.spanIndex) && (
												<JumpToOriginButton
													cardOrigin={(config.origin as QAOrigin).a as SingleOrigin}
												></JumpToOriginButton>
											)}
										</Grid>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid item>
					<cards.components.DeleteCardButton cardID={config.cardID}></cards.components.DeleteCardButton>
				</Grid>
			</Grid>
		</Card>
	);
};
