import React, { useRef, useEffect, MutableRefObject } from "react";
import { HybridCardField } from "../HybridCardField";
import { NoteOrigin } from "../../../../cards/model/model-origin";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../../cards";
import { DeleteCardButton } from "../Buttons/DeleteCardButton";
import { JumpToOriginButton } from "../Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "../Buttons/GrabForFieldButton";
import { getHoveredCardData } from "../../../selectors";
import focus from "../../../../focus";
import { trySetSourceCard } from "../../../actions";
import { Card, Paper, Grid } from "@material-ui/core";
import { noteText } from "../../../../../shared/text";
import { CardProps, borderStyle } from "./ClayCard";
//TODO-PERF: investigate if this hover-store approach is too slow, useRef instead?
export const NoteCard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	//TODO-NICE: allow grabbing from other cards
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

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
							<HybridCardField
								saveChanges={(value) => {
									dispatch(cards.actions.updateCardContent(value, config.cardID, "note", "REPLACE", config.origin));
								}}
								storeValue={config.content as string}
								label={noteText}
								variant="filled"
								style={{ backgroundColor: "#CBF3F0" }}
								InputLabelProps={{ style: { color: "#000000" } }}
								onMouseEnter={() => {
									dispatch(focus.actions.tryUpdateFocus("RIVER"));
									dispatch(trySetSourceCard("note", config.origin));
								}}
							></HybridCardField>
						</Grid>
						<Grid item>
							<Paper variant="outlined">
								<Grid container direction="column">
									<Grid item>
										{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="note"></GrabForFieldButton>}
									</Grid>

									<Grid item>
										{config.origin && (
											<JumpToOriginButton cardOrigin={config.origin as NoteOrigin}></JumpToOriginButton>
										)}
									</Grid>
								</Grid>
							</Paper>
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
