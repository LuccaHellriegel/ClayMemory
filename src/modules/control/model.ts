import { Reducer } from "react";
import { ActionCreators } from "redux-undo";
import cards from "../cards";
import db from "../db";
import selection from "../selection";
import { REDO_ACTION_HISTORY, UNDO_ACTION_HISTORY } from "./actionTypes";

export const selectionActions = [selection.actionTypes.SELECTION_GOAL, selection.actionTypes.SELECTION_SOURCE];
export const riverActions = [
	cards.actionTypes.CARD_PUSH,
	cards.actionTypes.CARD_REMOVE,
	db.actionTypes.LOAD_DOCUMENT_DATA_SETS,
];
export const cardActions = [
	db.actionTypes.LOAD_DOCUMENT_DATA_SETS,
	cards.actionTypes.CARD_PUSH,
	cards.actionTypes.CARD_REPLACE,
	cards.actionTypes.CARD_REMOVE,
];
export const dbActions = [db.actionTypes.LOAD_DOCUMENT_DATA_SETS];

export const undoableActions = [dbActions, cardActions, riverActions, selectionActions].flat();

export type Model = { past: string[][]; present: string[] | null; future: string[][] };

//TODO: this is NOT bugfree, somehow I got the present to be erased
// deletion bug? cant undo some deletions?

//TODO: where to put it instead of model?
export const undoRedoActionShield = (reducer: Reducer<any, any>, actionList: string[]) => (state: any, action: any) => {
	switch (action.type) {
		case UNDO_ACTION_HISTORY:
			if (actionList.includes(action.payload)) {
				return reducer(state, ActionCreators.undo());
			} else {
				return state;
			}
		case REDO_ACTION_HISTORY:
			if (actionList.includes(action.payload)) {
				return reducer(state, ActionCreators.redo());
			} else {
				return state;
			}
		default:
			return reducer(state, action);
	}
};
export const selectionShield = (reducer: Reducer<any, any>) => undoRedoActionShield(reducer, selectionActions);
export const cardsShield = (reducer: Reducer<any, any>) => undoRedoActionShield(reducer, cardActions);
export const riverShield = (reducer: Reducer<any, any>) => undoRedoActionShield(reducer, riverActions);
export const dbShield = (reducer: Reducer<any, any>) => undoRedoActionShield(reducer, dbActions);
