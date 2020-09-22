import React from "react";
import { CardConfig, NoteConfig, QAConfig } from "../../../../cards/model/config";
import { QACard } from "./QACard";
import { NoteCard } from "./NoteCard";

export const ClayCard = ({ config }: { config: CardConfig }) => {
	switch (config.type) {
		case "Note":
			return <NoteCard config={config as NoteConfig}></NoteCard>;
		case "Q-A":
			return <QACard config={config as QAConfig}></QACard>;
	}
};
