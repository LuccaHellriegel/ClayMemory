import { ReactNode, KeyboardEvent, useRef, MutableRefObject } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { KeyActionMap, keyEventDispatcherCreator } from "../../../../shared/utils";
import { actions } from "../../slice";

// note to self: prefer to expose components and not implementation details (actions etc.)

const pageControlKeyMap: KeyActionMap = {
	ArrowLeft: actions.previousPage(),
	ArrowRight: actions.nextPage(),
};
const pageControlDispatcher = keyEventDispatcherCreator(pageControlKeyMap);

export const PageKeyboardControl = ({ children }: { children: ReactNode }) => {
	const dispatch = useDispatch();
	const ref: MutableRefObject<null | HTMLInputElement> = useRef(null);

	return (
		<span
			ref={ref}
			onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
				pageControlDispatcher(event, dispatch);
			}}
			tabIndex={0}
		>
			{children}
		</span>
	);
};
