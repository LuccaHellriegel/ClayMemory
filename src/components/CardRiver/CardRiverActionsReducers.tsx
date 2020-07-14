export const CARD_RIVER_UPDATE = "CARD_RIVER_UPDATE";

export const cardRiverUpdate = (index: number, state: CardRiverStateType, card: CardConfig) => {
	return { type: CARD_RIVER_UPDATE, riverUpdate: { index, makeUp: state.riverMakeUps[index].concat([card]) } };
};

type CardType = "Note" | "Q-A" | "Cloze";

type CardContent = string | { q: string; a: string };

export type CardConfig = { type: CardType; content: CardContent };

type RiverMakeUp = CardConfig[];

export type CardRiverStateType = { riverMakeUps: RiverMakeUp[] };

export const cardRiverState = (
	state: CardRiverStateType = { riverMakeUps: [[{ type: "Note", content: "" }]] },
	{ type, riverUpdate }: { type: string; riverUpdate: { index: number; makeUp: RiverMakeUp } }
) => {
	switch (type) {
		case CARD_RIVER_UPDATE:
			const newState = { ...state };
			newState.riverMakeUps[riverUpdate.index] = riverUpdate.makeUp;
			return newState;
		default:
			return state;
	}
};
