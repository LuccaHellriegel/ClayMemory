export type CardType = "Note" | "Q-A" | "Cloze";

export type QACardContent = { q: string; a: string };

export type CardContent = string | QACardContent;

export type CardConfig = { cardIndex?: number; type: CardType; content: CardContent };

export type RiverMakeUp = { id: string; cards: CardConfig[]; active: boolean };
//export type RiverMakeUp = CardConfig[];

export type RiverMakeUps = { [id: string]: RiverMakeUp };

export type CardRiverState = {
	riverMakeUps: RiverMakeUps;
	activeRiverMakeUpIDs: string[];
	lastIndex: number;
};

export type CardPayload = { id: string; card: CardConfig };
