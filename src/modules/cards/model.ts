export type CardType = "Note" | "Q-A";

export type QACardContent = { q: string; a: string };

export type CardContent = string | QACardContent;

export type CardConfig = { cardID?: string; type: CardType; content: CardContent };

export type CardPayload = { riverID: string; card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";
