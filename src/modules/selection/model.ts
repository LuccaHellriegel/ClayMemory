import { SingleOrigin } from "../cards/model/origin";
import { CardField } from "../cards/model/content";
import { CardID, UpdateType } from "../cards/model/config";

export type SelectionSourceConfig = { contentStr: string; contentOrigin?: SingleOrigin };

export type CardFieldIdentifier = { cardID: CardID; cardField: CardField };
export type SelectionExistingCardTargetConfig = CardFieldIdentifier & { updateType: UpdateType };
export type SelectionTargetConfig = SelectionExistingCardTargetConfig | { cardField: CardField };
export const goalIsCreation = (goalConfig: SelectionTargetConfig) => {
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
	goalConfig: SelectionTargetConfig | null;
};
