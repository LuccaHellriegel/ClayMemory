import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pdf from "../../../../../pdf";
import { SingleOrigin } from "../../../../../cards/model/origin";

//TODO: same page origin-scrolling still does sometimes do nothing

export const PageSpanControl = ({ page, pageRef }: { page: number; pageRef: RefObject<null | HTMLDivElement> }) => {
	const spanOrigin = useSelector(pdf.selectors.getSpanOrigin);
	const count = useRef(0);

	// if this component is mounted again after scrolling away
	// by using the spanOrigin here we prevent double scrolling
	const [scrolledSpan, setScrolledSpan] = useState(spanOrigin);

	// TODO: think if I really want to jump only once?
	if (spanOrigin === null && scrolledSpan !== null) {
		setScrolledSpan(null);
	}

	const dispatch = useDispatch();

	// it is not guaranteed that the effect fires after the page was fully rendered
	// (depends on load)
	// so we try up to 10 times
	// this assumes every machine has finished rendering after approx 100 ms
	// then we assume that the origin was invalid (bug somewhere) and abort
	// otherwise it would be a infinite loop
	const trier = useCallback(() => {
		const intervalID = setInterval(() => {
			if (count.current === 10) {
				count.current = 0;
				clearInterval(intervalID);
				console.log("invalid origin clicked", spanOrigin);
				dispatch(pdf.actions.spanOrigin(null));
				setScrolledSpan(spanOrigin);
				return;
			}

			const textLayer = pageRef.current?.children.item(1);
			if (textLayer) {
				const originSpan = textLayer.children.item((spanOrigin as SingleOrigin).spanIndexStart);
				if (originSpan) {
					originSpan.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
					count.current = 0;
					setScrolledSpan(spanOrigin);
					clearInterval(intervalID);
					return;
				}
			}
			count.current = count.current + 1;
		}, 10);
	}, [dispatch, count, spanOrigin, pageRef]);

	//TODO: SelectionSnackbar should not overlap origin, maybe move it automatically

	useEffect(() => {
		if (
			spanOrigin &&
			spanOrigin.page === page &&
			pageRef.current &&
			// this is only not the same if this component was mounted and a new one arrives
			// then it only executes once and then it is the same
			scrolledSpan !== spanOrigin
		) {
			// assumption of fixed order
			const textLayer = pageRef.current.children.item(1);
			if (textLayer) {
				const originSpan = textLayer.children.item(spanOrigin.spanIndexStart);
				if (originSpan) {
					originSpan.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
					count.current = 0;
					setScrolledSpan(spanOrigin);
				} else {
					trier();
				}
			} else {
				trier();
			}
		}
	}, [dispatch, page, pageRef, spanOrigin, trier, scrolledSpan]);

	return null;
};
