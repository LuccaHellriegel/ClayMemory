import Grid from "@material-ui/core/Grid";
import React from "react";
import { ClayCardField } from "./ClayCardField";
import { QACardContent } from "../../../../cards/model/content";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import { Card } from "@material-ui/core";
import text from "../../../../text";
import { ClayCardFieldButtons } from "./ClayCardFieldButtons";
import { QAConfig } from "../../../../cards/model/config";

//TODO: use dark color pallet (theme?)

export const QACard = ({ config }: { config: QAConfig }) => {
	const dispatch = useDispatch();

	return (
		<Card variant="elevation" elevation={5} style={{ padding: "3px" }}>
			<Grid container direction="row" justify="space-between">
				<Grid item>
					<Grid container direction="column" spacing={1}>
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
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
								</Grid>

								<Grid item>
									<ClayCardFieldButtons cardField="q" config={config}></ClayCardFieldButtons>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction="row" spacing={1}>
								<Grid item>
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
