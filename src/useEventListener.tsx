import { useRef, useEffect, MutableRefObject } from "react";

export const useEventListener = (eventName: string, handler: any) => {
	const savedHandler: MutableRefObject<Function> = useRef(() => {});

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const eventListener = (event: Event) => savedHandler.current(event);
		document.addEventListener(eventName, eventListener);
		return () => {
			document.removeEventListener(eventName, eventListener);
		};
	}, [eventName, document]);
};
