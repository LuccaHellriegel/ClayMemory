import { RefObject, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleOrigin } from "../../../cards/model/origin";
import { getSpanOrigin } from "../../selectors";
import { actions } from "../../slice";

export const PageSpanControl = ({ page, pageRef }: { page: number; pageRef: RefObject<null | HTMLDivElement> }) => {
	const spanOrigin = useSelector(getSpanOrigin);
	const count = useRef(0);

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
				dispatch(actions.spanOrigin(null));
				return;
			}

			const textLayer = pageRef.current?.children.item(1);
			if (textLayer) {
				const originSpan = textLayer.children.item((spanOrigin as SingleOrigin).spanIndexStart);
				if (originSpan) {
					originSpan.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
					count.current = 0;
					clearInterval(intervalID);
					return;
				}
			}
			count.current = count.current + 1;
		}, 10);
	}, [dispatch, count, spanOrigin, pageRef]);

	useEffect(() => {
		if (spanOrigin && spanOrigin.page === page && pageRef.current) {
			// assumption of fixed order
			const textLayer = pageRef.current.children.item(1);
			if (textLayer) {
				const originSpan = textLayer.children.item(spanOrigin.spanIndexStart);
				if (originSpan) {
					originSpan.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
					count.current = 0;
				} else {
					trier();
				}
			} else {
				trier();
			}
		}
	}, [dispatch, page, pageRef, spanOrigin, trier]);

	return null;
};
