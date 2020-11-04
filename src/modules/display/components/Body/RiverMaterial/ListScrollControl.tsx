import { RefObject, useEffect } from "react";
import { VariableSizeList } from "react-window";
import { getCurrentView, getListIndex, getScrollToIndex } from "../../../selectors";
import { batch, useDispatch, useSelector } from "react-redux";
import river from "../../../../river";
import { View } from "../../../model";
import { actions } from "../../../slice";
import pdf from "../../../../pdf";

export const ListScrollControl = ({ listRef }: { listRef: RefObject<VariableSizeList> }) => {
	const currentIndex = useSelector(getListIndex);
	const currentPage = useSelector(pdf.selectors.getCurrentPage);
	const shouldScroll = useSelector(getScrollToIndex);

	const currentView = useSelector(getCurrentView);

	const riverOriginRequest = useSelector(river.selectors.getOriginRequest);

	const dispatch = useDispatch();

	useEffect(() => {
		if (currentPage !== currentIndex + 1 && shouldScroll) {
			listRef.current?.scrollToItem(currentPage - 1, "start");
			dispatch(actions.scrollToIndex(false));
		} else {
			// TODO: this leads to the current page being reset on reload of page / load of pdf
			// but we want to keep the current page (last page we visited)
			batch(() => {
				dispatch(pdf.actions.pageUpdate(currentIndex + 1));
				// hack for now to ensure we dont scroll to pages that we have already reached via manual scrolling
				dispatch(actions.scrollToIndex(false));
			});
		}
	}, [dispatch, currentPage, currentIndex, shouldScroll, listRef]);

	useEffect(() => {
		if (riverOriginRequest) {
			if (currentView !== View.RiverMaterial) dispatch(actions.currentView(View.RiverMaterial));

			dispatch(pdf.actions.pageUpdate(riverOriginRequest.page));
		}
	}, [dispatch, listRef, riverOriginRequest, currentView]);

	useEffect(() => {
		// only set spanOrigin once we have arrived at the correct page
		// this prevents some race-conditions
		if (riverOriginRequest && currentPage === currentIndex + 1) {
			// TODO: when jumping to a page that is not rendered completly yet (not react issue, but react-pdf)
			// then it does not scroll at all, so for now just hardcode a delay
			setTimeout(() => {
				dispatch(pdf.actions.spanOrigin(riverOriginRequest));
			}, 100);
			dispatch(river.actions.riverOriginRequest(null));
		}
	}, [dispatch, riverOriginRequest, currentPage, currentIndex]);

	return null;
};
