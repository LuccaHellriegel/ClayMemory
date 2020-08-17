import Grid from "@material-ui/core/Grid";
import React from "react";
import { HybridCardField } from "./HybridCardField";
import { CardConfig, QACardContent, NoteOrigin, SingleOrigin, QAOrigin } from "../../../cards/model";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../cards";
import { DeleteCardButton } from "./Buttons/DeleteCardButton";
import { JumpToOriginButton } from "./Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "./Buttons/GrabForFieldButton";
import { ExtractFromFieldButton } from "./Buttons/ExtractFromFieldButton";
import { isNullOrUndefined } from "util";
import { getHoveredCardData } from "../../selectors";

//TODO-RC: tooltips for all buttons, multiple languages?

//TODO-RC: mouse-up in editor should not trigger context menu, because I cant delete selections then, better use the Pinsel-Idea for inside the card

//TODO-RC: make full cards be not visible to the context menu by default (need to unmark them or sub-menu)

type CardProps = { config: CardConfig; riverID: string };

const borderStyle = { border: "2px solid green", borderRadius: "4px" };

const NoteCard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	return (
		<div style={isHoveredCard ? borderStyle : undefined}>
			<HybridCardField
				saveChanges={(value) => {
					dispatch(cards.actions.updateCardContent(value, config.cardID, "NOTE", "REPLACE", config.origin));
				}}
				storeValue={config.content as string}
				label="Note"
				variant="filled"
				style={{ backgroundColor: "#CBF3F0" }}
				InputLabelProps={{ style: { color: "#000000" } }}
			></HybridCardField>
			<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			<GrabForFieldButton cardConfig={config} creationType="NOTE"></GrabForFieldButton>
			<ExtractFromFieldButton cardOrigin={config.origin} sourceField="NOTE"></ExtractFromFieldButton>
			{config.origin && <JumpToOriginButton cardOrigin={config.origin as NoteOrigin}></JumpToOriginButton>}
		</div>
	);
};

const QACard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id, field } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	return (
		<Grid container direction="column" spacing={1}>
			<Grid item style={isHoveredCard && field === "Q" ? borderStyle : undefined}>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "Q", "REPLACE", config.origin));
					}}
					storeValue={(config.content as QACardContent).q}
					label={"Question"}
					variant="filled"
					style={{ backgroundColor: "#FFBF69" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
				<GrabForFieldButton cardConfig={config} creationType="Q"></GrabForFieldButton>
				<ExtractFromFieldButton cardOrigin={config.origin} sourceField="Q"></ExtractFromFieldButton>
				{config.origin && !isNullOrUndefined((config.origin as QAOrigin).q?.spanIndex) && (
					<JumpToOriginButton cardOrigin={(config.origin as QAOrigin).q as SingleOrigin}></JumpToOriginButton>
				)}
			</Grid>
			<Grid item style={isHoveredCard && field === "A" ? borderStyle : undefined}>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "A", "REPLACE", config.origin));
					}}
					storeValue={(config.content as QACardContent).a}
					label={"Answer"}
					variant="filled"
					style={{ backgroundColor: "#2EC4B6" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
				<GrabForFieldButton cardConfig={config} creationType="A"></GrabForFieldButton>
				<ExtractFromFieldButton cardOrigin={config.origin} sourceField="A"></ExtractFromFieldButton>
				{config.origin && !isNullOrUndefined((config.origin as QAOrigin).a?.spanIndex) && (
					<JumpToOriginButton cardOrigin={(config.origin as QAOrigin).a as SingleOrigin}></JumpToOriginButton>
				)}
			</Grid>
			<Grid item>
				<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			</Grid>
		</Grid>
	);
};

export const Card = ({ config, riverID }: CardProps) => {
	switch (config.type) {
		case "Note":
			return <NoteCard config={config} riverID={riverID}></NoteCard>;
		case "Q-A":
			return <QACard config={config} riverID={riverID}></QACard>;
	}
};
