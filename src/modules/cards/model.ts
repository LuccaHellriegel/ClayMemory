export type CardType = "Note" | "Q-A";

export type QACardContent = { q: string; a: string };

type CardContent = string | QACardContent;

export type CardOrigin = { spanIndex: number; page: number };

export type CardConfig = { cardID: string; type: CardType; content: CardContent; origin?: CardOrigin };

export type CardPayloadConfig = { cardID?: string; type: CardType; content: CardContent; origin?: CardOrigin };

export type CardPayload = { card: CardPayloadConfig };

export type FinalizedCardPayload = { card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";

export type GoalCard = CardConfig & { creationType: CreationType };

//TODO-NICE: think about Model-Separation, why do we need the coordinates to polute the Card-Model
export type SourceCard = { origin?: CardOrigin; x: number; y: number };

export type CardsState = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
	goalCard: GoalCard | null;
	sourceCard: SourceCard | null;
};
