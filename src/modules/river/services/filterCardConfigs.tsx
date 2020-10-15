import cards from "../../cards";
import { CardConfig, NoteConfig, QAConfig } from "../../cards/model/config";
import { RiverContentState } from "../model";
import { combineFilterArr, Filter } from "../../../shared/utils";

//TODO: make it not be accordion but closeable?
//TODO: make local show / hide notes
const qaFilter: Filter = (config: CardConfig) => config.type === "Q-A";
const noteFilter: Filter = (config: CardConfig) => config.type === "Note";
const contentFilter: (contentStr: string) => Filter = (contentFilterStr: string) => (config: CardConfig) => {
	switch (config.type) {
		case "Note":
			return cards.model.content.noteContentContainsStringOrEmpty(config as NoteConfig, contentFilterStr);
		case "Q-A":
			return cards.model.content.qaContentContainsStringOrEmpty(config as QAConfig, contentFilterStr);
	}
};

export const filterCardConfigs = (
	inputCards: CardConfig[],
	riverContentState: RiverContentState,
	contentFilterStr: string
): CardConfig[] => {
	if (riverContentState === "NONE") {
		return [];
	}

	const filters: Filter[] = [];

	if (riverContentState !== "ALL") {
		if (riverContentState === "QAS") {
			filters.push(qaFilter);
		} else if (riverContentState === "NOTES") {
			filters.push(noteFilter);
		}
	}
	if (contentFilterStr !== "") {
		filters.push(contentFilter(contentFilterStr));
	}

	return filters.length > 0 ? inputCards.filter(combineFilterArr(filters)) : inputCards;
};
