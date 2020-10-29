import React, { KeyboardEvent } from "react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";

export const UndoRedoKeyListener = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();

	return (
		<span
			onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
				if (event.ctrlKey) {
					//TODO: localisation, this is germany specific
					if (event.key === "z") {
						dispatch(ActionCreators.undo());
						event.preventDefault();
					} else if (event.key === "y") {
						dispatch(ActionCreators.redo());
						event.preventDefault();
					}
				}
			}}
		>
			{children}
		</span>
	);
};
