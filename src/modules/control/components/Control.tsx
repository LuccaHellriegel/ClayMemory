import { connect, useDispatch } from "react-redux";
import { useEventListener } from "../hooks/useEventListener";
import { keyboardControl } from "../services/keyboardControl";
import { mouseControl } from "../services/mouseControl";

function Control({ keyboardControl }: { keyboardControl: (event: KeyboardEvent) => void }) {
	useEventListener("keydown", keyboardControl);
	const dispatch = useDispatch();
	useEventListener("mousedown", (event: MouseEvent) => {
		dispatch(mouseControl(event));
	});
	return null;
}

export const ControlContainer = connect(
	() => {
		return {};
	},
	{
		keyboardControl,
	}
)(Control);
