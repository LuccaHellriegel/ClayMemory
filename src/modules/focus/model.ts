export type UserFocus = "DOCUMENT" | "CONTEXT_MENU" | "RIVER" | "CONTROL" | "RIVER_CONTROL";
export type DisplayFocus = "ACTIVE_RIVER" | "SUMMARY_RIVER";
export type FocusState = { userFocus: UserFocus; displayFocus: DisplayFocus };
