import { RefObject } from "react";

export type CreationData = {
	open: boolean;
	menuRef: RefObject<any>;
	qaRefs: RefObject<any>[];
	manuallySelectedString: string;
	selectedParentSpan: null | HTMLSpanElement;
};
