import { NAME } from "./constants";
import { createSelector } from "reselect";
import { SelectionData } from "./model";

export const getAll = (state: any): SelectionData => state[NAME].present;

export const getGoalConfig = createSelector(getAll, (state) => state.goalConfig);
export const getSourceConfig = createSelector(getAll, (state) => state.sourceConfig);

export const sourceConfigExists = createSelector(getSourceConfig, (config) => !!config);
