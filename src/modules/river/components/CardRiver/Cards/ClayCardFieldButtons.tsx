import React from "react";
import cards from "../../../../cards";
import { JumpToOriginButton } from "./JumpToOriginButton";
import { Paper, Grid } from "@material-ui/core";
import { CardConfig } from "../../../../cards/model/config";
import { CardField } from "../../../../cards/model/content";
import selection from "../../../../selection";

export const ClayCardFieldButtons = ({ config, cardField }: { config: CardConfig; cardField: CardField }) => {
	//TODO-RC: make CardExplorer

	return (
		<Paper variant="outlined">
			<Grid container direction="row">
				<Grid item>
					<selection.components.AppendButton
						cardID={config.cardID}
						cardField={cardField}
					></selection.components.AppendButton>
				</Grid>

				<Grid item>
					{config.origin && (
						<JumpToOriginButton
							cardOrigin={cards.model.permutation.toFieldValue(cardField, config.origin)}
						></JumpToOriginButton>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
};
