import { NAME } from "./constants";
import { createSelector } from "reselect";
import { SelectionData } from "./model";

export const getAll = (state: any): SelectionData => state[NAME];

export const getTargetConfig = createSelector(getAll, (state) => state.targetConfig);
export const getSourceConfig = createSelector(getAll, (state) => state.sourceConfig);

export const sourceConfigExists = createSelector(getSourceConfig, (config) => !!config);
