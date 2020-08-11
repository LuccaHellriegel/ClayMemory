import { CardRiverState, RiverShowState, pageNumberToRiverMakeUpID, RiverMakeUps, RiverMakeUp } from "./model";
import { FinalizedCardPayload } from "../cards/model";
import cards from "../cards";
import * as t from "./actionTypes";
import display from "../display";

const intialState: CardRiverState = {
	riverMakeUps: {
		[pageNumberToRiverMakeUpID(1)]: {
			riverID: pageNumberToRiverMakeUpID(1),
			cardIDs: ["2", "0", "1"],
			active: true,
		},
	},
	activeRiverMakeUpID: pageNumberToRiverMakeUpID(1),
	lastRiverIDNumber: 1,
	riverShowState: "SHOW",
};

const emptyCardRiver = (page: number): RiverMakeUp => {
	return {
		riverID: pageNumberToRiverMakeUpID(page),
		cardIDs: [],
		active: true,
	};
};

const updateStateWithMakeUps = (state: CardRiverState, ...makeUps: RiverMakeUp[]) => {
	const updatedState = { ...state };
	makeUps.forEach((makeUp) => {
		updatedState.riverMakeUps[makeUp.riverID] = makeUp;
	});
	return updatedState;
};

const deactivateActiveCardRiver = (state: CardRiverState) => {
	return { ...state.riverMakeUps[state.activeRiverMakeUpID], active: false };
};

const removeCardFromRivers = (state: CardRiverState, cardID: string): CardRiverState => {
	const riverMakeUps = Object.fromEntries(
		Object.entries(state.riverMakeUps).map((entry) => [
			entry[0],
			{ ...entry[1], cardIDs: entry[1].cardIDs.filter((id) => id !== cardID) },
		])
	);
	return { ...state, riverMakeUps };
};

const cardRiverState = (state = intialState, { type, payload }: { type: string; payload: any }) => {
	let riverMakeUp;
	let riverMakeUps;
	switch (type) {
		case display.actionTypes.PAGE_UPDATE:
			let activeRiver;
			if (!state.riverMakeUps[pageNumberToRiverMakeUpID(payload as number)]) {
				activeRiver = emptyCardRiver(payload as number);
			} else {
				activeRiver = { ...state.riverMakeUps[pageNumberToRiverMakeUpID(payload as number)], active: true };
			}

			const oldRiver = deactivateActiveCardRiver(state);

			return { ...updateStateWithMakeUps(state, activeRiver, oldRiver), activeRiverMakeUpID: activeRiver.riverID };

		case cards.actionTypes.CARD_PUSH:
			riverMakeUp = {
				...state.riverMakeUps[(payload as FinalizedCardPayload).riverID],
				cardIDs: [
					...state.riverMakeUps[(payload as FinalizedCardPayload).riverID].cardIDs,
					(payload as FinalizedCardPayload).card.cardID,
				],
			};
			riverMakeUps = { ...state.riverMakeUps };
			riverMakeUps[(payload as FinalizedCardPayload).riverID] = riverMakeUp;

			return { ...state, riverMakeUps: riverMakeUps };
		case cards.actionTypes.CARD_REMOVE:
			return removeCardFromRivers(state, payload as string);
		case t.RIVER_SHOW_STATE:
			return { ...state, riverShowState: payload as RiverShowState };
		default:
			return state;
	}
};

export default cardRiverState;
