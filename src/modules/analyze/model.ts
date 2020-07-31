export type MaterialSpanData = {
	materialSpanGroups: HTMLSpanElement[][];
	materialBoundingRectGroups: DOMRect[][];
};
export type MaterialWordData = { materialWordGroups: Range[][][]; materialWordSelectionGroups: (1 | 0)[][][] };

export type MaterialGroupData = MaterialSpanData & MaterialWordData;

export type MaterialDataTimeStamp = number;

export type MaterialData =
	| {
			materialDataTimeStamp: MaterialDataTimeStamp;
	  }
	| ({
			materialDataTimeStamp: MaterialDataTimeStamp;
	  } & MaterialGroupData);
