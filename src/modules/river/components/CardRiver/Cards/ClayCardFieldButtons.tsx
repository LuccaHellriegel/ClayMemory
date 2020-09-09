import React from "react";
import cards from "../../../../cards";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import { Paper, Grid } from "@material-ui/core";
import { AppendButton } from "../Buttons/AppendButton";
import { CardConfig } from "../../../../cards/model/model-config";
import { CardField } from "../../../../cards/model/model-content";

export const ClayCardFieldButtons = ({ config, cardField }: { config: CardConfig; cardField: CardField }) => {
	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	//TODO-RC: new view concept
	// can show / hide rivers (indivdual?) and filter cards (indivdual?)
	// now with scrolling I dont need the SummaryRiver
	// but need to be able to switch orientation ?
	// the good thing of the SummaryRiver is that it is more compact and sideways

	return (
		<Paper variant="outlined">
			<Grid container direction="row">
				<Grid item>{<AppendButton cardID={config.cardID} cardField={cardField}></AppendButton>}</Grid>

				<Grid item>{<GrabForFieldButton cardConfig={config} cardField={cardField}></GrabForFieldButton>}</Grid>
				<Grid item>
					{config.origin && (
						<JumpToOriginButton
							cardOrigin={cards.model.model_permutation.toFieldValue(cardField, config.origin)}
						></JumpToOriginButton>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
};
