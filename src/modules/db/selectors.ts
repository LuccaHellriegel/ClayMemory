import { createSelector } from "reselect";
import { NAME } from "./constants";
import { DocumentDB } from "./model";

export const getAll = (state: any): DocumentDB => state[NAME];

export const getDocumentNames = createSelector(getAll, (db) => Object.keys(db));

export const getDocumentDataSets = createSelector(getAll, (db) => Object.values(db));
