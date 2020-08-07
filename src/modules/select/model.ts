export type SectionMovementState = "FREE" | "LOCKED";

export type SelectionUpdateType = "MINUS_WORD" | "PLUS_WORD" | "MINUS_SPAN" | "PLUS_SPAN";

export type SectionUpdateType = "UP" | "DOWN";

export type SelectionType = "MOUSE" | "SECTION";

export type SelectionData = {
	sectionIndex: number;
	sectionUpdateAllowed: boolean;
	sectionMovementState: SectionMovementState;
	selectionType: SelectionType;
};
