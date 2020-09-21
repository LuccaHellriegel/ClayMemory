import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { widthPixels } from "../../actions";
import { debounce } from "throttle-debounce";

//TODO-NICE: make PR to react-pdf-sample or make my own, because the Memory/height bug makes his unusable
// height = real total height = render everything = can not scroll, because we are "showing" everything already

export const HTMLElementMeasurer = () => {
	const dispatch = useDispatch();

	const measure = debounce(50, () => {
		const htmlElement = document.documentElement;
		const currentWidth = htmlElement.clientWidth;
		const currentHeight = htmlElement.clientHeight;
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
