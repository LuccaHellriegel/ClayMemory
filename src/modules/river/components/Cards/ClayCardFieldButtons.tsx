import React from "react";
import cards from "../../../cards";
import { JumpToOriginButton } from "./JumpToOriginButton";
import { Paper, Grid } from "@material-ui/core";
import { CardConfig } from "../../../cards/model/config";
import { CardField } from "../../../cards/model/content";
import selection from "../../../selection";
import { SingleOrigin } from "../../../cards/model/origin";

export const ClayCardFieldButtons = ({ config, cardField }: { config: CardConfig; cardField: CardField }) => {
	const origin: SingleOrigin | null = config.origin
		? cards.model.permutation.toFieldValue(cardField, config.origin)
		: null;
	const originExists = origin?.page !== undefined;
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
					<selection.components.ReplaceButton
						cardID={config.cardID}
						cardField={cardField}
					></selection.components.ReplaceButton>
				</Grid>

				<Grid item>
					{originExists && <JumpToOriginButton cardOrigin={origin as SingleOrigin}></JumpToOriginButton>}
				</Grid>
			</Grid>
		</Paper>
	);
};
