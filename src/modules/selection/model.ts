import { CardOrigin } from "../cards/model/model-origin";
import { CardField } from "../cards/model/model-content";

// SourceCard is used when selecting/extracting from a card
// we need to copy origin if it exists and we need the sourceField to copy the correct origin value
export type SourceCard = { origin?: CardOrigin; sourceField: CardField };
export const isDifferentSourceCard = (
	sourceCard: SourceCard | null,
	otherField: CardField,
	otherOrigin?: CardOrigin
) => {
	return !sourceCard || sourceCard.sourceField !== otherField || sourceCard.origin !== otherOrigin;
};

export type SelectionData = {
	manuallySelectedString: string;
	selectedParentSpan: null | HTMLSpanElement;
	selectionPosition: { x: number; y: number };
	// is used to determine if we are extracting from a card
	sourceCard: SourceCard | null;
};
