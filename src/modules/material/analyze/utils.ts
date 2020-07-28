import { createSelector } from "reselect";
import { getTimeStamp } from "./selectors";

export const getDataExists = createSelector(getTimeStamp, (timestamp) => timestamp > 0);

export const createDataConditionalSelector = (realSelector: (state: any) => any) => (state: any) =>
	getDataExists(state) ? realSelector(state) : {};
