import { SingleOrigin } from "../cards/model/origin";

export type DisplayStatus = "SHOW" | "HIDE";

export enum View {
	RiverMaterial,
	RiverExplorer,
	CardExplorer,
}

export type DisplayState = {
	windowMeasurements?: { width: number; height: number };
	topOffset: number;
	currentView: View;
	listIndex: number;
	scrollToPage: boolean;
	scrollToOriginSpan: SingleOrigin | null;
};
