const EXTRACTION_BRACKET_RIGHTCLICK = "EXTRACTION_BRACKET_RIGHTCLICK";

export function clickBracket({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection, type: EXTRACTION_BRACKET_RIGHTCLICK };
}
