import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch } from "react-redux";
import { CardConfig, QACardContent } from "../model";
import { HybridCardField } from "./HybridCardField";

const NoteCard = ({ content }: { content: string }) => {
	return (
		<HybridCardField
			storeValue={content}
			fullWidth
			label="Note"
			variant="filled"
			style={{ backgroundColor: "#CBF3F0" }}
			InputLabelProps={{ style: { color: "#000000" } }}
		></HybridCardField>
	);
};

const QACard = ({ content }: { content: QACardContent }) => {
	return (
		<Grid container direction="column" spacing={1}>
			<Grid item>
				<HybridCardField
					storeValue={content.q}
					fullWidth
					label={"Question"}
					variant="filled"
					style={{ backgroundColor: "#FFBF69" }}
					InputLabelProps={{ style: { color: "#000000" } }}
				></HybridCardField>
			</Grid>
			<Grid item>
				<HybridCardField
					storeValue={content.a}
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

export const Card = ({ config }: { config: CardConfig }) => {
	const dispatch = useDispatch();

	switch (config.type) {
		case "Note":
			return <NoteCard content={config.content as string}></NoteCard>;
		case "Q-A":
			return <QACard content={config.content as { q: string; a: string }}></QACard>;
	}
};
