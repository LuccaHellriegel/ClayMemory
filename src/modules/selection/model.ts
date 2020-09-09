import { SingleOrigin } from "../cards/model/model-origin";
import { CardField } from "../cards/model/model-content";
import { CardFieldIdentifier, UpdateType } from "../cards/model/model-config";

export type SelectionSourceConfig = { contentStr: string; contentOrigin?: SingleOrigin };

export type SelectionExistingCardGoalConfig = CardFieldIdentifier & { updateType: UpdateType };
export type SelectionGoalConfig = SelectionExistingCardGoalConfig | { cardField: CardField };
export const goalIsCreation = (goalConfig: SelectionGoalConfig) => {
	// each existing card has an ID
	const idExists = !!(goalConfig as CardFieldIdentifier).cardID;
	return !idExists;
};

// Selection is made up of two parts: selecting and executing

export type SelectionData = {
	sourceConfig: SelectionSourceConfig | null;
	goalConfig: SelectionGoalConfig | null;
};
