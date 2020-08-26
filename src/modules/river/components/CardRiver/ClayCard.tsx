import Grid from "@material-ui/core/Grid";
import React from "react";
import { HybridCardField } from "./HybridCardField";
import { CardConfig } from "../../../cards/model/model";
import { QACardContent } from "../../../cards/model/model-content";
import { NoteOrigin, SingleOrigin, QAOrigin, QOnlyQAOrigin, AOnlyQAOrigin } from "../../../cards/model/model-origin";
import { useDispatch, useSelector } from "react-redux";
import cards from "../../../cards";
import { DeleteCardButton } from "./Buttons/DeleteCardButton";
import { JumpToOriginButton } from "./Buttons/JumpToOriginButton";
import { GrabForFieldButton } from "./Buttons/GrabForFieldButton";
import { isNullOrUndefined } from "util";
import { getHoveredCardData } from "../../selectors";
import focus from "../../../focus";
import { trySetSourceCard } from "../../actions";

//TODO-RC: tooltips for all buttons, multiple languages?

type CardProps = { config: CardConfig; riverID: string };

const borderStyle = { border: "2px solid green", borderRadius: "4px" };

//TODO-PERF: investigate if this hover-store approach is too slow, useRef instead?

const NoteCard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	//TODO-NICE: allow grabbing from other cards
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

	return (
		<div style={isHoveredCard ? borderStyle : undefined}>
			<HybridCardField
				saveChanges={(value) => {
					dispatch(cards.actions.updateCardContent(value, config.cardID, "note", "REPLACE", config.origin));
				}}
				storeValue={config.content as string}
				label="Note"
				variant="filled"
				style={{ backgroundColor: "#CBF3F0" }}
				InputLabelProps={{ style: { color: "#000000" } }}
				onMouseEnter={() => {
					dispatch(focus.actions.tryUpdateFocus("RIVER"));
					dispatch(trySetSourceCard("note", config.origin));
				}}
			></HybridCardField>
			<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="note"></GrabForFieldButton>}
			{config.origin && <JumpToOriginButton cardOrigin={config.origin as NoteOrigin}></JumpToOriginButton>}
		</div>
	);
};

const QACard = ({ config }: CardProps) => {
	const dispatch = useDispatch();
	const { id, field } = useSelector(getHoveredCardData);
	const isHoveredCard = config.cardID === id;

	// we only offer one way to use card-content in other cards: extract
	// we do not allow grabbing from other cards, just from the document, so we only need the grab button in the ActiveRiver
	const isActiveRiver = useSelector(focus.selectors.getDisplayFocus) === "ACTIVE_RIVER";

	return (
		<Grid container direction="column" spacing={1}>
			<Grid item style={isHoveredCard && field === "q" ? borderStyle : undefined}>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "q", "REPLACE", config.origin));
					}}
					storeValue={(config.content as QACardContent).q}
					label={"Question"}
					variant="filled"
					style={{ backgroundColor: "#FFBF69" }}
					InputLabelProps={{ style: { color: "#000000" } }}
					onMouseEnter={() => {
						dispatch(focus.actions.tryUpdateFocus("RIVER"));
						dispatch(trySetSourceCard("q", config.origin));
					}}
				></HybridCardField>
				{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="q"></GrabForFieldButton>}
				{config.origin && !isNullOrUndefined((config.origin as QOnlyQAOrigin).q?.spanIndex) && (
					<JumpToOriginButton cardOrigin={(config.origin as QAOrigin).q as SingleOrigin}></JumpToOriginButton>
				)}
			</Grid>
			<Grid item style={isHoveredCard && field === "a" ? borderStyle : undefined}>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "a", "REPLACE", config.origin));
					}}
					storeValue={(config.content as QACardContent).a}
					label={"Answer"}
					variant="filled"
					style={{ backgroundColor: "#2EC4B6" }}
					InputLabelProps={{ style: { color: "#000000" } }}
					onMouseEnter={() => {
						dispatch(focus.actions.tryUpdateFocus("RIVER"));
						dispatch(trySetSourceCard("a", config.origin));
					}}
				></HybridCardField>
				{isActiveRiver && <GrabForFieldButton cardConfig={config} creationType="a"></GrabForFieldButton>}
				{config.origin && !isNullOrUndefined((config.origin as AOnlyQAOrigin).a?.spanIndex) && (
					<JumpToOriginButton cardOrigin={(config.origin as QAOrigin).a as SingleOrigin}></JumpToOriginButton>
				)}
			</Grid>
			<Grid item>
				<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			</Grid>
		</Grid>
	);
};

export const ClayCard = ({ config, riverID }: CardProps) => {
	switch (config.type) {
		case "Note":
			return <NoteCard config={config} riverID={riverID}></NoteCard>;
		case "Q-A":
			return <QACard config={config} riverID={riverID}></QACard>;
	}
};