export type CardType = "Note" | "Q-A";

export type QACardContent = { q: string; a: string };

type CardContent = string | QACardContent;

export type SingleOrigin = { spanIndex: number; page: number };

//TODO-RC: origin needs to be per field (q/a) and not for whole card
export type QAOrigin = { q: { spanIndex?: number; page?: number }; a?: { spanIndex?: number; page?: number } };

export type NoteOrigin = SingleOrigin;

export type CardOrigin = NoteOrigin | QAOrigin;

export type NoteConfig = { cardID: string; type: CardType; content: string; origin?: NoteOrigin };

export type QAConfig = { cardID: string; type: CardType; content: QACardContent; origin?: QAOrigin };

export type CardConfig = NoteConfig | QAConfig;

export type CardPayloadConfig = { cardID?: string; type: CardType; content: CardContent; origin?: CardOrigin };

export type CardPayload = { card: CardPayloadConfig };

export type FinalizedCardPayload = { card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";

export type GoalCard = CardConfig & { creationType: CreationType };

//TODO-NICE: think about Model-Separation, why do we need the coordinates to polute the Card-Model
export type SourceCard = { origin?: CardOrigin; sourceField: CreationType; x: number; y: number };

export type CardsState = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
	goalCard: GoalCard | null;
	sourceCard: SourceCard | null;
};
