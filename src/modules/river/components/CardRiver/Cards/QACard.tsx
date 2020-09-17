import Grid from "@material-ui/core/Grid";
import React, { useRef, useEffect, MutableRefObject } from "react";
import { ClayCardField } from "./ClayCardField";
import { QACardContent } from "../../../../cards/model/model-content";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { getHoveredCardData } from "../../../selectors";
import { Card } from "@material-ui/core";
import { borderStyle } from "./ClayCard";
import text from "../../../../text";
import { ClayCardFieldButtons } from "./ClayCardFieldButtons";
import { QAConfig } from "../../../../cards/model/model-config";

//TODO-NICE:
// make dropdown / menu for selection to create card from selection snackbar?
// show if selection has origin / button jump to origin at snackbar?
// make REPLACE-button for River
// replace Context-Menu with APPEND/REPLACE button flow? / allow both?

//TODO-NICE: think of way to not have menu over the cards, because you cant read them this way? end of card?
//TODO-NICE: use dark color pallet (theme?)

export const QACard = ({ config }: { config: QAConfig }) => {
	const dispatch = useDispatch();
	const { id, field } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	const ref: MutableRefObject<undefined | HTMLDivElement> = useRef();
	useEffect(() => {
		if (ref.current && isHoveredCard) {
			(ref.current as HTMLDivElement).scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
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
										<ClayCardField
											saveChanges={(value) => {
												dispatch(cards.actions.replaceCardFieldContent("q", config, value));
											}}
											storeValue={(config.content as QACardContent).q}
											label={text.constants.questionText}
											variant="filled"
											style={{ backgroundColor: "#FFBF69" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											fieldOrigin={config.origin?.q}
										></ClayCardField>
									</div>
								</Grid>

								<Grid item>
									<ClayCardFieldButtons cardField="q" config={config}></ClayCardFieldButtons>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
									<div style={isHoveredCard && field === "a" ? borderStyle : undefined}>
										<ClayCardField
											saveChanges={(value) => {
												dispatch(cards.actions.replaceCardFieldContent("a", config, value));
											}}
											storeValue={(config.content as QACardContent).a}
											label={text.constants.answerText}
											style={{ backgroundColor: "#2EC4B6" }}
											InputLabelProps={{ style: { color: "#000000" } }}
											fieldOrigin={config.origin?.a}
										></ClayCardField>
									</div>
								</Grid>
								<Grid item>
									<ClayCardFieldButtons cardField="a" config={config}></ClayCardFieldButtons>
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
