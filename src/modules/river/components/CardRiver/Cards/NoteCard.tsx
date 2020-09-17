import React from "react";
import { ClayCardField } from "./ClayCardField";
import { useDispatch } from "react-redux";
import cards from "../../../../cards";
import { Card, Grid } from "@material-ui/core";
import text from "../../../../text";
import { NoteConfig } from "../../../../cards/model/config";
import { ClayCardFieldButtons } from "./ClayCardFieldButtons";

export const NoteCard = ({ config }: { config: NoteConfig }) => {
	const dispatch = useDispatch();

	return (
		<Card variant="elevation" elevation={5} style={{ padding: "3px" }}>
			<Grid container direction="row" justify="space-between">
				<Grid item>
					<Grid container direction="row" spacing={1}>
						<Grid item>
							<ClayCardField
								saveChanges={(value) => {
									dispatch(cards.actions.cardReplace({ ...config, content: value } as NoteConfig));
								}}
								storeValue={config.content as string}
								label={text.constants.noteText}
								variant="filled"
								style={{ backgroundColor: "#CBF3F0" }}
								InputLabelProps={{ style: { color: "#000000" } }}
								fieldOrigin={config.origin}
							></ClayCardField>
						</Grid>
						<Grid item>
							<ClayCardFieldButtons cardField="note" config={config}></ClayCardFieldButtons>
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
