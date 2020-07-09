const EXTRACTION_MENU_LEFTCLICK = "EXTRACTION_MENU_LEFTCLICK";

export function clickMenu({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection, type: EXTRACTION_MENU_LEFTCLICK };
}

//TODO: unify bracket and menu, add object and reducer
