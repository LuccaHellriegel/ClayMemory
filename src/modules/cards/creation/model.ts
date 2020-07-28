import { RefObject } from "react";

export type ContextMenuState = { open: boolean; menuRef: RefObject<any> };

export type CreationData = ContextMenuState;
