import { RefObject } from "react";

export type Position = { x: number; y: number };

export type CreationData = {
	//this is needed to access the DOMElement of the base-menu
	menuRef: RefObject<any>;
	// position
	position: Position | null;
};
