import { ReactNode, KeyboardEvent, useRef, MutableRefObject } from "react";
import { pageControlDispatcher } from "../../actions";
import React from "react";
import { useDispatch } from "react-redux";

// note to self: prefer to expose components and not implementation details (actions etc.)

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
