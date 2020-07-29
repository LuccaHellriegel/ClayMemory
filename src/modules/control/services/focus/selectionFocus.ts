import display from "../../../material/display";
import select from "../../../material/select";

export const pageControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "ArrowLeft":
			event.preventDefault();
			dispatch(display.actions.previousPage());
			break;
		case "ArrowRight":
			event.preventDefault();
			dispatch(display.actions.nextPage());
			break;
	}
};

export const sectionControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "ArrowDown":
			event.preventDefault();
			dispatch(select.actions.updateSection("DOWN"));
			break;
		case "ArrowUp":
			event.preventDefault();
			dispatch(select.actions.updateSection("UP"));
			break;
		case " ":
			event.preventDefault();
			dispatch(select.actions.toggleSectionMovementState());
	}
};

export const selectionControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "a":
			event.preventDefault();
			dispatch(select.actions.updateSelection("PLUS_WORD"));
			break;
		case "d":
			event.preventDefault();
			dispatch(select.actions.updateSelection("MINUS_WORD"));
			break;
		case "w":
			event.preventDefault();
			dispatch(select.actions.updateSelection("PLUS_SPAN"));
			break;
		case "s":
			event.preventDefault();
			dispatch(select.actions.updateSelection("MINUS_SPAN"));
			break;
	}
};
