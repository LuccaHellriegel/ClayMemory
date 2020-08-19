export type CardID = string;

export type CardType = "Note" | "Q-A";

export type CardField = "NOTE" | "Q" | "A";

type NoteCardContent = string;

export type QACardContent = { q: string; a: string };

type CardContent = NoteCardContent | QACardContent;

export type SingleOrigin = { spanIndex: number; page: number };

export type QAOrigin = { q: { spanIndex?: number; page?: number }; a?: { spanIndex?: number; page?: number } };

export type NoteOrigin = SingleOrigin;

export type CardOrigin = NoteOrigin | QAOrigin;

export type NoteConfig = { cardID: CardID; type: CardType; content: NoteCardContent; origin?: NoteOrigin };

export type QAConfig = { cardID: CardID; type: CardType; content: QACardContent; origin?: QAOrigin };

export type CardConfig = NoteConfig | QAConfig;

export type CardPayloadConfig = { cardID?: CardID; type: CardType; content: CardContent; origin?: CardOrigin };

export type CardPayload = { card: CardPayloadConfig };

export type FinalizedCardPayload = { card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "NOTE" | "Q" | "A";

export type GoalCard = CardConfig & { creationType: CreationType };

export type CardsState = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
	goalCard: GoalCard | null;
};
