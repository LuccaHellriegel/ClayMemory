import { createSelector } from "reselect";
import { MaterialData, MaterialGroupData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME];

export const getTimeStamp = createSelector(getAll, (state: MaterialData) => state.materialDataTimeStamp);

export const getMaterialSpans = createSelector(getAll, (state: MaterialGroupData) => state.materialSpans);

export const getMaterialBoundingRects = createSelector(
	getAll,
	(state: MaterialGroupData) => state.materialBoundingRects
);

export const getDataExists = createSelector(getTimeStamp, (timestamp) => timestamp > 0);

export const createDataConditionalSelector = (realSelector: (state: any) => any) => (state: any) =>
	getDataExists(state) ? { ...realSelector(state), show: true } : {};
