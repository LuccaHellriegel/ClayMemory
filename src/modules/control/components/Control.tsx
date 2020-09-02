import { connect } from "react-redux";
import { useEventListener } from "../hooks/useEventListener";
import { mouseDownControl, rightClickControl } from "../services/mouseControl";

function Control({
	mouseDownControl,
	rightClickControl,
}: {
	mouseDownControl: (event: MouseEvent) => void;
	rightClickControl: (event: MouseEvent) => void;
}) {
	useEventListener("mousedown", mouseDownControl);
	useEventListener("contextmenu", rightClickControl);
	return null;
}

export const ControlContainer = connect(
	() => {
		return {};
	},
	{
		mouseDownControl,
		rightClickControl,
	}
)(Control);
