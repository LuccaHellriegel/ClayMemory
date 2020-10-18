import { RefObject, useEffect } from "react";
import { VariableSizeList } from "react-window";
import { getCurrentPage, getCurrentView, getScrollToPage } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSpanOrigin, setView } from "../../actions";
import river from "../../../river";
import { View } from "../../model";

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
			dispatch(setView(View.RiverMaterial));
		}

		if (riverOriginRequest) {
			listRef.current?.scrollToItem(riverOriginRequest.page - 1, "auto");
			dispatch(setSpanOrigin(riverOriginRequest));
			dispatch(setPage(riverOriginRequest.page, false));
			dispatch(river.actions.riverOriginRequest(null));
			return;
		}

		if (scrollToPage) {
			listRef.current?.scrollToItem(scrollToPage - 1, "start");
			dispatch(setPage(scrollToPage, false));
		}
	}, [dispatch, listRef, scrollToPage, riverOriginRequest, currentView]);

	return null;
};
