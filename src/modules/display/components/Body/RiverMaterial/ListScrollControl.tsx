import { RefObject, useEffect } from "react";
import { VariableSizeList } from "react-window";
import { getCurrentView, getListIndex, getScrollToPage } from "../../../selectors";
import { batch, useDispatch, useSelector } from "react-redux";
import river from "../../../../river";
import { View } from "../../../model";
import { actions } from "../../../slice";
import pdf from "../../../../pdf";

export const ListScrollControl = ({ listRef }: { listRef: RefObject<VariableSizeList> }) => {
	const currentIndex = useSelector(getListIndex);
	const currentPage = useSelector(pdf.selectors.getCurrentPage);
	const shouldScroll = useSelector(getScrollToPage);

	const currentView = useSelector(getCurrentView);

	const riverOriginRequest = useSelector(river.selectors.getOriginRequest);

	const dispatch = useDispatch();

	useEffect(() => {
		if (currentPage !== currentIndex + 1 && shouldScroll) {
			listRef.current?.scrollToItem(currentPage - 1, "start");
			dispatch(actions.scrollToPage(false));
		} else {
			// TODO: this leads to the current page being reset on reload of page / load of pdf
			// but we want to keep the current page (last page we visited)
			batch(() => {
				dispatch(pdf.actions.pageUpdate(currentIndex + 1));
				// hack for now to ensure we dont scroll to pages that we have already reached via manual scrolling
				dispatch(actions.scrollToPage(false));
			});
		}
	}, [dispatch, currentPage, currentIndex, shouldScroll, listRef]);

	useEffect(() => {
		if (riverOriginRequest) {
			batch(() => {
				if (currentView !== View.RiverMaterial) dispatch(actions.currentView(View.RiverMaterial));
				dispatch(pdf.actions.spanOrigin(riverOriginRequest));
				dispatch(actions.scrollToOriginSpan(riverOriginRequest));
				dispatch(river.actions.riverOriginRequest(null));
			});
		}
	}, [dispatch, listRef, riverOriginRequest, currentView]);

	return null;
};
