import { connect } from "react-redux";
import { useEventListener } from "../hooks/useEventListener";
import { keyDownControl } from "../services/keyboardControl";
import { mouseDownControl, mouseUpControl } from "../services/mouseControl";

function Control({
	keyDownControl,
	mouseDownControl,
	mouseUpControl,
}: {
	keyDownControl: (event: KeyboardEvent) => void;
	mouseDownControl: (event: MouseEvent) => void;
	mouseUpControl: (event: MouseEvent) => void;
}) {
	useEventListener("keydown", keyDownControl);
	useEventListener("mousedown", mouseDownControl);
	useEventListener("mouseup", mouseUpControl);
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
	}
)(Control);
