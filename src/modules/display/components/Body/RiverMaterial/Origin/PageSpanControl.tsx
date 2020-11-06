import { RefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import pdf from "../../../../../pdf";
import { SingleOrigin } from "../../../../../cards/model/origin";
import { getListIndex, getScrollToOriginSpan } from "../../../../selectors";
import { Dispatch } from "redux";
import { actions } from "../../../../slice";

//TODO: same page origin-scrolling still does sometimes do nothing

// case 0: pressed on same page first time after scrolling the origin-text out of sight
// case 1: pressed on same page first time
// case 2: pressed on same page second time
// case 3: pressed on same page after unmarking
// case 4: pressed on other page in render-range first time
// case 5: pressed on other page in render-range first time after unmarking
// case 6: pressed on other page outside render-range first time
// case 7: pressed on other page outside render-range first time after unmarking
// case 8: after pressing scrolling away inside render-range
// case 9: after pressing scrolling away and back inside render-range
// case 10: after pressing scrolling away outside render-range
// case 11: after pressing scrolling away and back outside render-range

const scrollToOriginSpan = (pageRef: RefObject<HTMLDivElement>, spanOrigin: SingleOrigin) => {
	// assumption of fixed order
	if (!pageRef.current) return false;

	const textLayer = pageRef.current.children.item(1);
	if (textLayer) {
		const originSpan = textLayer.children.item(spanOrigin.spanIndexStart);
		if (originSpan) {
			// TODO: nearest is buggy that is why its center, but nearest would be smoother
			originSpan.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const scrollToOriginSpanInterval = (
	pageRef: RefObject<HTMLDivElement>,
	spanOrigin: SingleOrigin,
	dispatch: Dispatch,
	count = 0
) => {
	// it is not guaranteed that the effect fires after the page was fully rendered
	// (depends on load)
	// so we try up to 10 times
	// this assumes every machine has finished rendering after approx 100 ms
	// then we assume that the origin was invalid (bug somewhere) and abort
	// otherwise it would be a infinite loop
	if (count === 10) {
		console.log("invalid origin clicked", spanOrigin);
		dispatch(pdf.actions.spanOrigin(null));
		dispatch(actions.scrollToOriginSpan(null));
		return false;
	}

	if (!scrollToOriginSpan(pageRef, spanOrigin)) {
		setTimeout(() => {
			scrollToOriginSpanInterval(pageRef, spanOrigin, dispatch, count + 1);
		}, 10);
	} else {
		dispatch(actions.scrollToOriginSpan(null));
	}
};

export const PageSpanControl = ({ page, pageRef }: { page: number; pageRef: RefObject<HTMLDivElement> }) => {
	const scrollToOriginSpan = useSelector(getScrollToOriginSpan);
	const currentPage = useSelector(pdf.selectors.getCurrentPage);
	const currentIndex = useSelector(getListIndex);

	const dispatch = useDispatch();

	useEffect(() => {
		if (scrollToOriginSpan && scrollToOriginSpan.page === page && currentIndex + 1 === currentPage) {
			scrollToOriginSpanInterval(pageRef, scrollToOriginSpan, dispatch);
		}
	}, [dispatch, pageRef, scrollToOriginSpan, page, currentIndex, currentPage]);

	// const trier = useCallback(() => {
	// 	const intervalID = setInterval(() => {
	// 		if (count.current === 10) {
	// 			count.current = 0;
	// 			clearInterval(intervalID);
	// 			console.log("invalid origin clicked", spanOrigin);
	// 			dispatch(pdf.actions.spanOrigin(null));
	// 			return;
	// 		}

	// 		const textLayer = pageRef.current?.children.item(1);
	// 		if (textLayer) {
	// 			const originSpan = textLayer.children.item((spanOrigin as SingleOrigin).spanIndexStart);
	// 			if (originSpan) {
	// 				originSpan.scrollIntoView({ behavior: "auto", block: "center", inline: "center" });
	// 				count.current = 0;
	// 				clearInterval(intervalID);
	// 				return;
	// 			}
	// 		}
	// 		count.current = count.current + 1;
	// 	}, 10);
	// }, [dispatch, count, spanOrigin, pageRef]);

	//TODO: SelectionSnackbar should not overlap origin, maybe move it automatically

	return null;
};
