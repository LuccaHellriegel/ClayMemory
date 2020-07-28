import material from "../../../material";

export const pageControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "ArrowLeft":
			event.preventDefault();
			dispatch(material.display.actions.previousPage());
			break;
		case "ArrowRight":
			event.preventDefault();
			dispatch(material.display.actions.nextPage());
			break;
	}
};

export const sectionControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "ArrowDown":
			event.preventDefault();
			dispatch(material.select.actions.updateSection("DOWN"));
			break;
		case "ArrowUp":
			event.preventDefault();
			dispatch(material.select.actions.updateSection("UP"));
			break;
		case " ":
			event.preventDefault();
			dispatch(material.select.actions.toggleSectionMovementState());
	}
};

export const selectionControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "a":
			event.preventDefault();
			dispatch(material.select.actions.updateSelection("PLUS_WORD"));
			break;
		case "d":
			event.preventDefault();
			dispatch(material.select.actions.updateSelection("MINUS_WORD"));
			break;
		case "w":
			event.preventDefault();
			dispatch(material.select.actions.updateSelection("PLUS_SPAN"));
			break;
		case "s":
			event.preventDefault();
			dispatch(material.select.actions.updateSelection("MINUS_SPAN"));
			break;
	}
};
