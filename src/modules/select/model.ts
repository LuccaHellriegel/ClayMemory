export type SectionMovementState = "FREE" | "LOCKED";

export type SectionUpdateType = "UP" | "DOWN";

export type SelectionType = "MOUSE" | "SECTION";

export type SelectionData = {
	sectionIndex: number;
	sectionUpdateAllowed: boolean;
	sectionMovementState: SectionMovementState;
	selectionType: SelectionType;
	manuallySelectedString: string;
};
