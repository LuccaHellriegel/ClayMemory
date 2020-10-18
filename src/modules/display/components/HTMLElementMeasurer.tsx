import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "throttle-debounce";
import { actions } from "../slice";

export const HTMLElementMeasurer = () => {
	const dispatch = useDispatch();

	const measure = debounce(50, () => {
		const htmlElement = document.documentElement;
		const currentWidth = htmlElement.clientWidth;
		const currentHeight = htmlElement.clientHeight;
		dispatch(actions.windowMeasurements({ width: currentWidth, height: currentHeight }));
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
