export type CardType = "Note" | "Q-A";

export type QACardContent = { q: string; a: string };

export type CardContent = string | QACardContent;

export type CardConfig = { cardID: string; type: CardType; content: CardContent };

export type CardPayloadConfig = { cardID?: string; type: CardType; content: CardContent };

export type CardPayload = { riverID: string; card: CardPayloadConfig };

export type FinalizedCardPayload = { riverID: string; card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";

export type CardsState = { cards: { [cardID: string]: CardConfig }; lastCardIDNumber: number };
