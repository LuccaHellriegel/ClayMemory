import { SelectionUpdateType } from "./ControlActionsReducers";

export const updateSelectionGroup = (selectionGroup: (1 | 0)[][], type: SelectionUpdateType) => {
	let foundSpan = false;
	const newSelectionGroup = [];

	switch (type) {
		case "MINUS_WORD":
			for (let index = 0; index < selectionGroup.length; index++) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const oneIndex = spanGroup.indexOf(1);
					if (oneIndex !== -1) {
						foundSpan = true;
						spanGroup = [...spanGroup];
						spanGroup[oneIndex] = 0;
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup;
			break;
		case "PLUS_WORD":
			for (let index = selectionGroup.length - 1; index >= 0; index--) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const zeroIndex = spanGroup.lastIndexOf(0);
					if (zeroIndex !== -1) {
						foundSpan = true;
						spanGroup = [...spanGroup];
						spanGroup[zeroIndex] = 1;
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup.reverse();
			break;
		case "MINUS_SPAN":
			for (let index = 0; index < selectionGroup.length; index++) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const oneIndex = spanGroup.indexOf(1);
					if (oneIndex !== -1) {
						foundSpan = true;
						spanGroup = spanGroup.map((_) => 0);
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup;
			break;
		case "PLUS_SPAN":
			for (let index = selectionGroup.length - 1; index >= 0; index--) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const zeroIndex = spanGroup.lastIndexOf(0);
					if (zeroIndex !== -1) {
						foundSpan = true;
						spanGroup = spanGroup.map((_) => 1);
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup.reverse();
			break;
	}

	return null;
};
