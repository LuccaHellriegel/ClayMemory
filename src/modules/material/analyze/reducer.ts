import * as t from "./actionTypes";
import { MaterialData } from "./model";

const initialState: MaterialData = { materialDataTimeStamp: -Infinity };

const materialData = (state = initialState, { type, payload }: { type: string; payload: any }): MaterialData => {
	switch (type) {
		case t.MATERIAL_DATA:
			return payload;
		case t.SELECTION_UPDATE:
			return { ...state, materialWordSelectionGroups: payload };
		default:
			return state;
	}
};

export default materialData;
