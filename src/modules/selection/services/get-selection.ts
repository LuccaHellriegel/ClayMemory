import { SelectionSourceConfig } from "../model";
import { SingleOrigin } from "../../cards/model/model-origin";

type SelectionData = { text: string; selection: Selection };

export const getSelectionWorkaround = (): SelectionData | null => {
	const selection = window.getSelection();

	if (!selection) return null;

	try {
		var activeElement = document.activeElement;
		if (activeElement && (activeElement as HTMLInputElement).value) {
			// firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
			const str = (activeElement as HTMLInputElement).value.substring(
				(activeElement as HTMLInputElement).selectionStart as number,
				(activeElement as HTMLInputElement).selectionEnd as number
			);

			if (str === "") return null;

			return { text: str, selection };
		} else {
			const selStr = selection.toString();

			if (selStr === "") return null;

			return { text: selStr, selection };
		}
	} catch (e) {
		return null;
	}
};

// TODO-RC: selection from other cards

const materialSelectionDataToSourceConfig = (
	selectionData: SelectionData,
	page: number
): SelectionSourceConfig | false => {
	//TODO-NICE: think about race-conditions for the delayed rendering, this might mess up the index
	//TODO-NICE: this also depends on the rendering order of the spans to be the same, might not be a good idea
	//TODO-NICE: maybe can do this async if it gets more complex?

	const selectedParent = selectionData.selection.focusNode?.parentNode as HTMLSpanElement;
	if (!!!selectedParent || selectedParent.nodeName !== "SPAN") return false;

	const divTextLayerParent = selectedParent.parentNode;
	if (!!!divTextLayerParent || divTextLayerParent.nodeName !== "DIV") return false;

	const spanChildren = Array.from(divTextLayerParent.children);
	if (spanChildren.length === 0) return false;

	const index = spanChildren.indexOf(selectedParent);
	if (index < 0) return false;

	return { contentStr: selectionData.text, contentOrigin: { spanIndex: index, page } };
};

export const getSelectionSourceFromMaterial = (page: number): SelectionSourceConfig | false => {
	const selectionData = getSelectionWorkaround();
	if (!selectionData) return false;

	return materialSelectionDataToSourceConfig(selectionData, page);
};

export const getSelectionSourceFromCard = (contentOrigin?: SingleOrigin): SelectionSourceConfig | false => {
	const selectionData = getSelectionWorkaround();
	if (!selectionData) return false;

	return { contentStr: selectionData.text, contentOrigin };
};
