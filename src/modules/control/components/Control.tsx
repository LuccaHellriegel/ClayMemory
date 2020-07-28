import { connect } from "react-redux";
import { useEventListener } from "../hooks/useEventListener";
import { keyboardControl } from "../services/keyboardControl";

function Control({ keyboardControl }: { keyboardControl: (event: KeyboardEvent) => void }) {
	useEventListener("keydown", keyboardControl);
	return null;
}

export const ControlContainer = connect(() => {}, {
	keyboardControl,
})(Control);
