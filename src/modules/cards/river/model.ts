type CardType = "Note" | "Q-A" | "Cloze";

type CardContent = string | { q: string; a: string };

export type CardConfig = { type: CardType; content: CardContent };

export type RiverMakeUp = CardConfig[];

export type CardRiverState = { riverMakeUps: RiverMakeUp[] };
