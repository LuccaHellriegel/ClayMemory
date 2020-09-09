import React from "react";
import { CardConfig, NoteConfig, QAConfig } from "../../../../cards/model/model-config";
import { QACard } from "./QACard";
import { NoteCard } from "./NoteCard";

export type CardProps = { config: CardConfig; riverID: string };

export const borderStyle = { border: "4px solid green", borderRadius: "4px" };

export const ClayCard = ({ config, riverID }: CardProps) => {
	switch (config.type) {
		case "Note":
			return <NoteCard config={config as NoteConfig}></NoteCard>;
		case "Q-A":
			return <QACard config={config as QAConfig}></QACard>;
	}
};
