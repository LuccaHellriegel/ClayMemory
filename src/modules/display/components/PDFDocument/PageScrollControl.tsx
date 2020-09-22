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
	const requestedOrigin = useSelector(river.selectors.getOriginRequest);
	useEffect(() => {
		listRef.current?.scrollToItem(currentPage - 1, "start");
	}, []);

	const dispatch = useDispatch();

	useEffect(() => {
		if ((requestedOrigin || scrollToPage) && currentView !== View.RiverMaterial) {
			dispatch(setView(View.RiverMaterial));
		}

		if (requestedOrigin) {
			listRef.current?.scrollToItem(requestedOrigin.page - 1, "auto");
			dispatch(setSpanOrigin(requestedOrigin));
			dispatch(setPage(requestedOrigin.page, false));
			dispatch(river.actions.resetOriginRequest());
			return;
		}

		if (scrollToPage) {
			listRef.current?.scrollToItem(scrollToPage - 1, "start");
			dispatch(setPage(scrollToPage, false));
		}
	}, [dispatch, listRef, scrollToPage, requestedOrigin, currentView]);

	return null;
};
