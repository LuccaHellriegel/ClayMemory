import { createSelector } from "reselect";
import { MaterialData, MaterialWordData, MaterialSpanData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME];

export const getTimeStamp = createSelector(getAll, (state: MaterialData) => state.materialDataTimeStamp);

export const getWordSelectionGroups = createSelector(
	getAll,
	(state: MaterialWordData) => state.materialWordSelectionGroups
);

export const getWordRangeGroups = createSelector(getAll, (state: MaterialWordData) => state.materialWordGroups);

export const getMaterialSpanGroups = createSelector(getAll, (state: MaterialSpanData) => state.materialSpanGroups);

export const getMaterialBoundingRectGroups = createSelector(
	getAll,
	(state: MaterialSpanData) => state.materialBoundingRectGroups
);

export const getDataExists = createSelector(getTimeStamp, (timestamp) => timestamp > 0);

export const createDataConditionalSelector = (realSelector: (state: any) => any) => (state: any) =>
	getDataExists(state) ? { ...realSelector(state), show: true } : {};
