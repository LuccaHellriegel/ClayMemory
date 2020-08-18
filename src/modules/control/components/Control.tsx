import { connect } from "react-redux";
import { useEventListener } from "../hooks/useEventListener";
import { keyDownControl } from "../services/keyboardControl";
import { mouseDownControl, mouseUpControl, rightClickControl } from "../services/mouseControl";

function Control({
	keyDownControl,
	mouseDownControl,
	mouseUpControl,
	rightClickControl,
}: {
	keyDownControl: (event: KeyboardEvent) => void;
	mouseDownControl: (event: MouseEvent) => void;
	mouseUpControl: (event: MouseEvent) => void;
	rightClickControl: (event: MouseEvent) => void;
}) {
	useEventListener("keydown", keyDownControl);
	useEventListener("mousedown", mouseDownControl);
	useEventListener("mouseup", mouseUpControl);
	useEventListener("contextmenu", rightClickControl);
	return null;
}

export const ControlContainer = connect(
	() => {
		return {};
	},
	{
		keyDownControl,
		mouseDownControl,
		mouseUpControl,
		rightClickControl,
	}
)(Control);
