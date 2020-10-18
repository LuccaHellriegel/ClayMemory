import { RefObject, useEffect } from "react";
import { VariableSizeList } from "react-window";
import { getCurrentView } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import river from "../../../river";
import { View } from "../../model";
import { actions } from "../../slice";
import pdf from "../../../pdf";

export const ListScrollControl = ({ listRef }: { listRef: RefObject<VariableSizeList> }) => {
	const currentView = useSelector(getCurrentView);

	const scrollToPage = useSelector(pdf.selectors.getScrollToPage);
	const currentPage = useSelector(pdf.selectors.getCurrentPage);
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
			dispatch(pdf.actions.spanOrigin(riverOriginRequest));
			dispatch(pdf.actions.pageUpdate({ page: riverOriginRequest.page, shouldScroll: false }));
			dispatch(river.actions.riverOriginRequest(null));
			return;
		}

		if (scrollToPage) {
			listRef.current?.scrollToItem(scrollToPage - 1, "start");
			dispatch(pdf.actions.pageUpdate({ page: scrollToPage, shouldScroll: false }));
		}
	}, [dispatch, listRef, scrollToPage, riverOriginRequest, currentView]);

	return null;
};
