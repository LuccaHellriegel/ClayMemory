import React from "react";
import { useSelector } from "react-redux";
import cards from "../../../../cards";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import focus from "../../../../focus";
import { Paper, Grid } from "@material-ui/core";
import { AppendButton } from "../Buttons/AppendButton";
import { CardConfig } from "../../../../cards/model/model-config";
import { CardField } from "../../../../cards/model/model-content";

export const ClayCardFieldButtons = ({ config, cardField }: { config: CardConfig; cardField: CardField }) => {
	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

	return (
		<Paper variant="outlined">
			<Grid container direction="row">
				<Grid item>{isActiveRiver && <AppendButton cardID={config.cardID} cardField={cardField}></AppendButton>}</Grid>

				<Grid item>
					{isActiveRiver && <GrabForFieldButton cardConfig={config} cardField={cardField}></GrabForFieldButton>}
				</Grid>
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
