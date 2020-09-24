import { SelectionSourceConfig } from "../model";
import { SingleOrigin } from "../../cards/model/origin";

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

const materialSelectionDataToSourceConfig = (
	selectionData: SelectionData,
	page: number
): SelectionSourceConfig | false => {
	//TODO-NICE: think about race-conditions for the delayed rendering, this might mess up the index
	//TODO-NICE: this also depends on the rendering order of the spans to be the same, might not be a good idea
	//TODO-NICE: maybe can do this async if it gets more complex?

	const selection = selectionData.selection;
	let selectedParentStart = selection.anchorNode?.parentNode as Node | null;
	let selectedParentEnd = selection.focusNode?.parentNode as Node | null;

	if (!selectedParentStart || !selectedParentEnd) {
		return false;
	}

	if (selectedParentStart.nodeName === "MARK") {
		selectedParentStart = selectedParentStart.parentNode;
		if (!selectedParentStart) return false;
	}

	if (selectedParentEnd.nodeName === "MARK") {
		selectedParentEnd = selectedParentEnd.parentNode;
		if (!selectedParentEnd) return false;
	}

	if (selectedParentStart.nodeName !== "SPAN" || selectedParentEnd.nodeName !== "SPAN") return false;

	const divTextLayerParent = selectedParentStart.parentNode;
	if (!!!divTextLayerParent || divTextLayerParent.nodeName !== "DIV") return false;

	const spanChildren = Array.from(divTextLayerParent.childNodes) as Node[];
	if (spanChildren.length === 0) return false;

	const startIndex = spanChildren.indexOf(selectedParentStart);
	const endIndex = spanChildren.indexOf(selectedParentEnd);
	if (startIndex === -1 || endIndex === -1) return false;

	return {
		contentStr: selectionData.text,
		contentOrigin: { spanIndexStart: startIndex, spanIndexEnd: endIndex, page },
	};
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
