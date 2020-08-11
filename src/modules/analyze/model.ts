export type MaterialGroupData = {
	materialSpans: HTMLSpanElement[];
	materialBoundingRects: DOMRect[];
};

type MaterialDataTimeStamp = number;

export type MaterialData =
	| {
			materialDataTimeStamp: MaterialDataTimeStamp;
	  }
	| ({
			materialDataTimeStamp: MaterialDataTimeStamp;
	  } & MaterialGroupData);
