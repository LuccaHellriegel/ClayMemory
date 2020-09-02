export function getSelection() {
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
			return { text: selection.toString(), selection };
		}
	} catch (e) {
		return null;
	}
}
