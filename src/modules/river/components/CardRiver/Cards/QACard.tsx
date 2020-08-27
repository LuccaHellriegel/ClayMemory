import Grid from "@material-ui/core/Grid";
import React, { useRef, useEffect, MutableRefObject } from "react";
import { HybridCardField } from "../HybridCardField";
import { QACardContent } from "../../../../cards/model/model-content";
import { SingleOrigin, QAOrigin, QOnlyQAOrigin, AOnlyQAOrigin } from "../../../../cards/model/model-origin";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { DeleteCardButton } from "../Buttons/DeleteCardButton";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import { isNullOrUndefined } from "util";
import { getHoveredCardData } from "../../../selectors";
import focus from "../../../../focus";
import { trySetSourceCard } from "../../../actions";
import { Card, Paper } from "@material-ui/core";
import { questionText, answerText } from "../../../../../shared/text";
import { CardProps, borderStyle } from "./ClayCard";
//TODO-RC: make Q/A in menu bigger so that you dont accidentially move off it
//TODO-RC: make Q/A as a general field for hoevered data, so that it does not jank so much
//TODO-NICE: think of way to not have menu over the cards, because you cant read them this way? end of card?
//TODO-RC: use dark color pallet (theme?)

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
			(ref.current as HTMLDivElement).focus();
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
											label={questionText}
											variant="filled"
											style={{ backgroundColor: "#FFBF69" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											onMouseEnter={() => {
												dispatch(focus.actions.tryUpdateFocus("RIVER"));
												dispatch(trySetSourceCard("q", config.origin));
											}}
										></HybridCardField>
									</div>
								</Grid>

								<Grid item>
									<Paper variant="outlined">
										<Grid container direction="column">
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
											label={answerText}
											style={{ backgroundColor: "#2EC4B6" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											onMouseEnter={() => {
												dispatch(focus.actions.tryUpdateFocus("RIVER"));
												dispatch(trySetSourceCard("a", config.origin));
											}}
										></HybridCardField>
									</div>
								</Grid>
								<Grid item>
									<Paper variant="outlined">
										<Grid container direction="column">
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
					<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
				</Grid>
			</Grid>
		</Card>
	);
};