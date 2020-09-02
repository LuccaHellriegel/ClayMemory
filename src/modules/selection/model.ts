import { CardOrigin } from "../cards/model/model-origin";
import { CardField } from "../cards/model/model-content";

// SourceCard is used when selecting/extracting from a card
export type SourceCard = { origin?: CardOrigin; sourceField: CardField };

export type SelectionData = {
	manuallySelectedString: string;
	selectedParentSpan: null | HTMLSpanElement;
	selectionPosition: { x: number; y: number };
	// is used to determine if we are extracting from a card
	sourceCard: SourceCard | null;
};
