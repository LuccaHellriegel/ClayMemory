export type DisplayStatus = "SHOW" | "HIDE";

export enum View {
	RiverMaterial,
	RiverExplorer,
	CardExplorer,
}

export type DisplayData = {
	windowMeasurements: { width: number; height: number } | null;
	topOffset: number;
	currentView: View;
};
