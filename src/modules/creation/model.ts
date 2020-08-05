import { RefObject } from "react";

export type ContextMenuState = { open: boolean; menuRef: RefObject<any>; qaRefs: RefObject<any>[] };

export type CreationData = ContextMenuState;

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";
