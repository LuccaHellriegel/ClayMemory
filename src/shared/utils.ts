export const incrementer = () => {
	let counter = 0;
	return () => {
		const curCounter = counter;
		counter++;
		return curCounter;
	};
};

//TODO-NICE: return selection and string, so that selection is not accessed twice
export function getSelectionText() {
	if (window.getSelection) {
		try {
			var activeElement = document.activeElement;
			if (activeElement && (activeElement as HTMLInputElement).value) {
				// firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=85686
				return (activeElement as HTMLInputElement).value.substring(
					(activeElement as HTMLInputElement).selectionStart as number,
					(activeElement as HTMLInputElement).selectionEnd as number
				);
			} else {
				return window.getSelection()?.toString();
			}
		} catch (e) {
			return "";
		}
	} else if (
		((document as unknown) as { selection: Selection }).selection &&
		((document as unknown) as { selection: Selection }).selection.type !== "Control"
	) {
		// For IE
		return ((((document as unknown) as { selection: Selection }).selection as unknown) as {
			createRange: () => { text: string };
		}).createRange().text;
	} else {
		return "";
	}
}
