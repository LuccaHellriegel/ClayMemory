import { RefObject, useEffect } from "react";
import { VariableSizeList } from "react-window";
import { getCurrentPage, getCurrentView, getScrollToPage } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import river from "../../../river";
import { View } from "../../model";
import { actions } from "../../slice";

export const PageScrollControl = ({ listRef }: { listRef: RefObject<VariableSizeList> }) => {
	const currentView = useSelector(getCurrentView);

	const scrollToPage = useSelector(getScrollToPage);
	const currentPage = useSelector(getCurrentPage);
	const riverOriginRequest = useSelector(river.selectors.getOriginRequest);
	useEffect(() => {
		listRef.current?.scrollToItem(currentPage - 1, "start");
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		if ((riverOriginRequest || scrollToPage) && currentView !== View.RiverMaterial) {
			dispatch(actions.currentView(View.RiverMaterial));
		}

		if (riverOriginRequest) {
			listRef.current?.scrollToItem(riverOriginRequest.page - 1, "auto");
			dispatch(actions.spanOrigin(riverOriginRequest));
			dispatch(actions.pageUpdate({ page: riverOriginRequest.page, shouldScroll: false }));
			dispatch(river.actions.riverOriginRequest(null));
			return;
		}

		if (scrollToPage) {
			listRef.current?.scrollToItem(scrollToPage - 1, "start");
			dispatch(actions.pageUpdate({ page: scrollToPage, shouldScroll: false }));
		}
	}, [dispatch, listRef, scrollToPage, riverOriginRequest, currentView]);

	return null;
};
