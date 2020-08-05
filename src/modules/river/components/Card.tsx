import Grid from "@material-ui/core/Grid";
import React from "react";
import { HybridCardField } from "./HybridCardField";
import { CardConfig, QACardContent } from "../../cards/model";
import { useDispatch } from "react-redux";
import cards from "../../cards";

type CardProps = { config: CardConfig; riverID: string };

const NoteCard = ({ config, riverID }: CardProps) => {
	const dispatch = useDispatch();

	return (
		<HybridCardField
			saveChanges={(value) => {
				dispatch(cards.actions.updateCardContent(value, config.cardID, "NOTE", "REPLACE", riverID));
			}}
			storeValue={config.content as string}
			fullWidth
			label="Note"
			variant="filled"
			style={{ backgroundColor: "#CBF3F0" }}
			InputLabelProps={{ style: { color: "#000000" } }}
		></HybridCardField>
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
					fullWidth
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
					fullWidth
					label={"Answer"}
					variant="filled"
					style={{ backgroundColor: "#2EC4B6" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
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
