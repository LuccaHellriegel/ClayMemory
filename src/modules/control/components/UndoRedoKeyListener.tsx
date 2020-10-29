import React, { KeyboardEvent, useState } from "react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import { SimpleSnackbar } from "./SimpleSnackbar";

export const UndoRedoKeyListener = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();
	const [snackbarState, setSnackbarState] = useState("");

	const close = () => {
		setSnackbarState("");
	};
	//TODO: the snackbars of UndoRedoButtons und this UndoRedo are overlapping, also copied logic

	//TODO: undo/redo for Textfields is different than this undo/redo, there should be only one way
	return (
		<span
			onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
				if (event.ctrlKey) {
					//TODO: localisation, this is germany specific
					if (event.key === "z") {
						dispatch(ActionCreators.undo());
						event.preventDefault();
						setSnackbarState("undo");
					} else if (event.key === "y") {
						dispatch(ActionCreators.redo());
						event.preventDefault();
						setSnackbarState("redo");
					}
				}
			}}
		>
			{snackbarState === "undo" && <SimpleSnackbar message={"Executed undo"} close={close} />}

			{snackbarState === "redo" && <SimpleSnackbar message={"Executed redo"} close={close} />}

			{children}
		</span>
	);
};
