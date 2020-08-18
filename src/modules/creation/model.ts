import { RefObject } from "react";

export type CreationData = {
	open: boolean;
	//this is needed to access the DOMElement of the base-menu
	menuRef: RefObject<any>;
	// this is for the fullCards sub-menu
	fullCardRef: RefObject<any>;
	//these are needed to access the DOMElement of the sub-menus
	qaRefs: RefObject<any>[];
	manuallySelectedString: string;
	selectedParentSpan: null | HTMLSpanElement;
	selectionPosition: { x: number; y: number };
};
