export type UserFocus = "SELECTION" | "CONTEXT_MENU" | "EDITOR" | "CONTROL" | "EDITOR_CONTROL";
export type DisplayFocus = "ACTIVE_RIVER" | "SUMMARY_RIVER";
export type FocusState = { userFocus: UserFocus; displayFocus: DisplayFocus };
