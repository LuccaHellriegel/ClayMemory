import { createSelector } from "reselect";
import { DocumentDBState } from "./model";
import { NAME } from "./constants";

export const getAll = (state: any) => state[NAME].present;

export const getDocumentDB = createSelector(getAll, (state: DocumentDBState) => state.documentDB);

export const getDocumentNames = createSelector(getDocumentDB, (db) => Object.keys(db));

export const getDocumentDataSets = createSelector(getDocumentDB, (db) => Object.values(db));
