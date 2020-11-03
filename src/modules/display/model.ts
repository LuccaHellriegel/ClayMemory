export type DisplayStatus = "SHOW" | "HIDE";

export enum View {
	RiverMaterial,
	RiverExplorer,
	CardExplorer,
}

export type DisplayState = {
	windowMeasurements: { width: number; height: number } | null;
	topOffset: number;
	currentView: View;
	listIndex: number;
	scrollToIndex: boolean;
};
