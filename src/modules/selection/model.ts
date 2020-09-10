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

// Selection is made up of two parts: selecting a source and selecting a goal
// If both are done, then a Card needs to be created or updated
// By clarifying this concept, I was able to reduce the selection code and make it more composable
// See: AppendButton can be used before or after selecting a source without any extra code
// This shows that a correct conceptualisation of the problem domain operations is the most important
// thing in programming (note to self :))

export type SelectionData = {
	sourceConfig: SelectionSourceConfig | null;
	goalConfig: SelectionGoalConfig | null;
};
