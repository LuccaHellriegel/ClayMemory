import { connect } from "react-redux";
import { keyboardControl } from "./ControlActionsReducers";
import { useEventListener } from "../../hooks/useEventListener";

function Control({ keyboardControl }: { keyboardControl: (event: KeyboardEvent) => void }) {
	useEventListener("keydown", keyboardControl);
	return null;
}

export const ControlContainer = connect(() => {}, {
	keyboardControl,
})(Control);
