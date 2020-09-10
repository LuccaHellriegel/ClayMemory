import React, { useRef, useEffect, MutableRefObject } from "react";
import { ClayCardField } from "./ClayCardField";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { getHoveredCardData } from "../../../selectors";
import { Card, Grid } from "@material-ui/core";
import { borderStyle } from "./ClayCard";
import text from "../../../../text";
import { NoteConfig } from "../../../../cards/model/model-config";
import { ClayCardFieldButtons } from "./ClayCardFieldButtons";

//TODO-PERF: investigate if this hover-store approach is too slow, useRef instead?
export const NoteCard = ({ config }: { config: NoteConfig }) => {
	const dispatch = useDispatch();
	const { id } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	//TODO-NICE: allow grabbing from other cards

	const ref: MutableRefObject<undefined | HTMLDivElement> = useRef();
	useEffect(() => {
		if (ref.current && isHoveredCard) {
			(ref.current as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	});

	return (
		<Card
			variant="elevation"
			elevation={5}
			style={isHoveredCard ? { ...borderStyle, padding: "3px" } : { padding: "3px" }}
			ref={ref}
		>
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
