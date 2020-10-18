import { SingleOrigin } from "../cards/model/origin";
import { SelectionSourceConfig, SelectionGoalConfig, SelectionExistingCardGoalConfig } from "./model";
import { Dispatch } from "redux";
import { getGoalConfig, getSourceConfig } from "./selectors";
import { selectionToCard } from "./services/use-selection";
import { getSelectionSourceFromMaterial, getSelectionSourceFromCard } from "./services/get-selection";
import { CardID } from "../cards/model/config";
import { CardField } from "../cards/model/content";
import { actions } from "./slice";

const selectionSource = actions.selectionSource;
export const resetSelectionSource = () => selectionSource(null);
const selectionGoal = actions.selectionGoal;
export const resetSelectionGoal = () => selectionGoal(null);

// we want to support either direction, first adding Goal or first adding Source
export const addSelectionSource = (config: SelectionSourceConfig) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const goalConfig = getGoalConfig(state);
		if (!goalConfig) {
			dispatch(selectionSource(config));
			return;
		}
		selectionToCard(config, goalConfig as SelectionGoalConfig, dispatch, state);
		dispatch(resetSelectionGoal());
	};
};

export const addMaterialSelectionSource = (page: number) => {
	const sourceConfig = getSelectionSourceFromMaterial(page);
	if (sourceConfig) {
		return addSelectionSource(sourceConfig);
	}
	return false;
};

export const addCardSelectionSource = (contentOrigin?: SingleOrigin) => {
	const sourceConfig = getSelectionSourceFromCard(contentOrigin);
	if (sourceConfig) {
		return addSelectionSource(sourceConfig);
	}
	return false;
};

export const addSelectionGoal = (config: SelectionGoalConfig) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const sourceConfig = getSourceConfig(state);
		if (!sourceConfig) {
			dispatch(selectionGoal(config));
			return;
		}
		selectionToCard(sourceConfig as SelectionSourceConfig, config, dispatch, state);
		dispatch(resetSelectionSource());
	};
};

export const addCardAppendSelectionGoal = (cardID: CardID, cardField: CardField) => {
	const config: SelectionExistingCardGoalConfig = { cardID, cardField, updateType: "APPEND" };
	return addSelectionGoal(config);
};

export const addCardReplaceSelectionGoal = (cardID: CardID, cardField: CardField) => {
	const config: SelectionExistingCardGoalConfig = { cardID, cardField, updateType: "REPLACE" };
	return addSelectionGoal(config);
};
