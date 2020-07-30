export type CardType = "Note" | "Q-A" | "Cloze";

type CardContent = string | { q: string; a: string };

export type CardConfig = { cardIndex?: number; type: CardType; content: CardContent };

export type RiverMakeUp = CardConfig[];

export type CardRiverState = { riverMakeUps: RiverMakeUp[] };

export type CardPayload = { index: number; card: CardConfig };
