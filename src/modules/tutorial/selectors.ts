import { NAME } from "./constants";
import { createSelector } from "reselect";
import { TutorialState } from "./model";

export const getAll = (state: any): TutorialState => state[NAME];

export const getStep = createSelector(getAll, (state) => state.step);
