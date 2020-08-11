export type MaterialGroupData = {
	materialSpanGroups: HTMLSpanElement[][];
	materialBoundingRectGroups: DOMRect[][];
};

type MaterialDataTimeStamp = number;

export type MaterialData =
	| {
			materialDataTimeStamp: MaterialDataTimeStamp;
	  }
	| ({
			materialDataTimeStamp: MaterialDataTimeStamp;
	  } & MaterialGroupData);
