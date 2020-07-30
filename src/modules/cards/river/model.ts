export type CardType = "Note" | "Q-A" | "Cloze";

export type QACardContent = { q: string; a: string };

export type CardContent = string | QACardContent;

export type CardConfig = { cardIndex?: number; type: CardType; content: CardContent };

export type RiverMakeUp = CardConfig[];

export type CardRiverState = { riverMakeUps: RiverMakeUp[] };

export type CardPayload = { index: number; card: CardConfig };
