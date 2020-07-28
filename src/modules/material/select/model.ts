export type SectionMovementState = "FREE" | "LOCKED";
export type SelectionData = {
	sectionIndex: number;
	sectionUpdateAllowed: boolean;
	sectionMovementState: SectionMovementState;
};

export type SelectionUpdateType = "MINUS_WORD" | "PLUS_WORD" | "MINUS_SPAN" | "PLUS_SPAN";

export type SectionUpdateType = "UP" | "DOWN";
