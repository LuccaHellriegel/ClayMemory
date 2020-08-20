import { NoteOrigin, QAOrigin, CardOrigin } from "./model-origin";
import { NoteCardContent, QACardContent, CardContent } from "./model-content";

export type CardType = "Note" | "Q-A";
export type CardID = string;
export type NoteConfig = { cardID: CardID; type: CardType; content: NoteCardContent; origin?: NoteOrigin };
export type QAConfig = { cardID: CardID; type: CardType; content: QACardContent; origin?: QAOrigin };
export type CardConfig = NoteConfig | QAConfig;

export type CardPayloadConfig = { cardID?: CardID; type: CardType; content: CardContent; origin?: CardOrigin };
export type CardPayload = { card: CardPayloadConfig };
export type FinalizedCardPayload = { card: CardConfig };

export type UpdateType = "REPLACE" | "APPEND";

export type CreationType = "note" | "q" | "a";

export type GoalCard = CardConfig & { creationType: CreationType };

export type CardsState = {
	cards: { [cardID: string]: CardConfig };
	lastCardIDNumber: number;
	goalCard: GoalCard | null;
};
