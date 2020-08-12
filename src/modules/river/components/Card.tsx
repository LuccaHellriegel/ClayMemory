import Grid from "@material-ui/core/Grid";
import React from "react";
import { HybridCardField } from "./HybridCardField";
import { CardConfig, QACardContent } from "../../cards/model";
import { useDispatch } from "react-redux";
import cards from "../../cards";
import { DeleteCardButton } from "./DeleteCardButton";
import { JumpToOriginButton } from "./JumpToOriginButton";

//TODO-RC: mouse-up in editor should not trigger context menu, because I cant delete selections then, better use the Pinsel-Idea for inside the card

//TODO-RC: make full cards be not visible to the context menu by default (need to unmark them or sub-menu)

type CardProps = { config: CardConfig; riverID: string };

const NoteCard = ({ config, riverID }: CardProps) => {
	const dispatch = useDispatch();

	return (
		<div>
			<HybridCardField
				saveChanges={(value) => {
					dispatch(cards.actions.updateCardContent(value, config.cardID, "NOTE", "REPLACE", riverID));
				}}
				storeValue={config.content as string}
				label="Note"
				variant="filled"
				style={{ backgroundColor: "#CBF3F0" }}
				InputLabelProps={{ style: { color: "#000000" } }}
			></HybridCardField>
			<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
			{config.origin && <JumpToOriginButton cardOrigin={config.origin}></JumpToOriginButton>}
		</div>
	);
};

const QACard = ({ config, riverID }: CardProps) => {
	const dispatch = useDispatch();

	return (
		<Grid container direction="column" spacing={1}>
			<Grid item>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "Q", "REPLACE", riverID));
					}}
					storeValue={(config.content as QACardContent).q}
					label={"Question"}
					variant="filled"
					style={{ backgroundColor: "#FFBF69" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
			</Grid>
			<Grid item>
				<HybridCardField
					saveChanges={(value) => {
						dispatch(cards.actions.updateCardContent(value, config.cardID, "A", "REPLACE", riverID));
					}}
					storeValue={(config.content as QACardContent).a}
					label={"Answer"}
					variant="filled"
					style={{ backgroundColor: "#2EC4B6" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
			</Grid>
			<Grid item>
				<DeleteCardButton cardID={config.cardID}></DeleteCardButton>
				{config.origin && <JumpToOriginButton cardOrigin={config.origin}></JumpToOriginButton>}
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
