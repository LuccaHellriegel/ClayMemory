import { createSelector } from "reselect";
import { DisplayData } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME];

export const getPDF = createSelector(getAll, (state: DisplayData) => {
	return { pdf: state.pdf };
});

export const getRenderCritialData = createSelector(getAll, (state: DisplayData) => {
	console.log(state);
	return { pdf: state.pdf, currentPage: state.currentPage };
});

export const getTotalPages = createSelector(getAll, (state: DisplayData) => state.totalPages);

export const getCurrentPage = createSelector(getAll, (state: DisplayData) => state.currentPage);

export const getPageControlData = createSelector(
	getTotalPages,
	getCurrentPage,
	(totalPages: number | undefined, currentPage: number) => {
		return { currentPage, totalPages };
	}
);
