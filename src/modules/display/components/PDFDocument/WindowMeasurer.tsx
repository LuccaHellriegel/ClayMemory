import { useEffect, useRef, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { widthPixels } from "../../actions";
import { debounce } from "throttle-debounce";

//TODO-RC: make PR to react-pdf-sample or make my own, because the Memory/height bug makes his unusable
// height = real total height = render everything = can not scroll, because we are "showing" everything already

export const WindowMeasurer = () => {
	const dispatch = useDispatch();

	const measure = debounce(50, () => {
		const currentWidth = window.innerWidth;
		const currentHeight = window.innerHeight;
		dispatch(widthPixels({ width: currentWidth, height: currentHeight }));
	});

	useLayoutEffect(() => {
		//first measurement
		measure();
	}, [measure]);

	useEffect(() => {
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("resize", measure);
		};
	});

	return null;
};
