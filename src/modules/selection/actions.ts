import { SingleOrigin } from "../cards/model/origin";
import { SelectionSourceConfig, SelectionTargetConfig, SelectionExistingCardTargetConfig } from "./model";
import { Dispatch } from "redux";
import { getTargetConfig, getSourceConfig } from "./selectors";
import { selectionToCard } from "./services/use-selection";
import { getSelectionSourceFromMaterial, getSelectionSourceFromCard } from "./services/get-selection";
import { CardID } from "../cards/model/config";
import { CardField } from "../cards/model/content";
import { actions } from "./slice";

const selectionSource = actions.selectionSource;
export const resetSelectionSource = () => selectionSource(null);
const selectionTarget = actions.selectionTarget;
export const resetSelectionTarget = () => selectionTarget(null);

// we want to support either direction, first adding Target or first adding Source
export const addSelectionSource = (config: SelectionSourceConfig) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const goalConfig = getTargetConfig(state);
		if (!goalConfig) {
			dispatch(selectionSource(config));
			return;
		}
		selectionToCard(config, goalConfig as SelectionTargetConfig, dispatch, state);
		dispatch(resetSelectionTarget());
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

export const addSelectionTarget = (config: SelectionTargetConfig) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const sourceConfig = getSourceConfig(state);
		if (!sourceConfig) {
			dispatch(selectionTarget(config));
			return;
		}
		selectionToCard(sourceConfig as SelectionSourceConfig, config, dispatch, state);
		dispatch(resetSelectionSource());
	};
};

export const addCardAppendSelectionTarget = (cardID: CardID, cardField: CardField) => {
	const config: SelectionExistingCardTargetConfig = { cardID, cardField, updateType: "APPEND" };
	return addSelectionTarget(config);
};

export const addCardReplaceSelectionTarget = (cardID: CardID, cardField: CardField) => {
	const config: SelectionExistingCardTargetConfig = { cardID, cardField, updateType: "REPLACE" };
	return addSelectionTarget(config);
};
