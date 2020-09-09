import React, { RefObject, useRef, useLayoutEffect, useState, Fragment, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { VariableSizeList } from "react-window";
import { PageMaterialPair } from "./PageMaterialPair";
import { CachedPageDimensions, Pages, PageNumbers, SizeData, PageDimensions } from "./PDFDocument";
import { getCurrentPage } from "../../selectors";
import { useSelector } from "react-redux";

const computeRowHeight = (index: number, cachedPageDimensions: CachedPageDimensions, responsiveScale: number) => {
	return (cachedPageDimensions.get(index + 1) as [number, number])[1] / responsiveScale;
};

function computeResponsiveScale(
	pageNumber: number,
	cachedPageDimensions: CachedPageDimensions,
	pages: Pages,
	pageNumbers: PageNumbers
) {
	const node = pages.get(pageNumbers.get(pageNumber));

	if (!node) return;

	return (cachedPageDimensions.get(pageNumber) as [number, number])[1] / node.clientHeight;
}

function handleResize(
	currentPageRef: RefObject<number>,
	cachedPageDimensions: CachedPageDimensions,
	pages: Pages,
	pageNumbers: PageNumbers,
	responsiveScale: number,
	initialContainerHeight: number,
	setSizeData: (sizeData: SizeData) => void
) {
	// Recompute the responsive scale factor on window resize
	const newResponsiveScale = computeResponsiveScale(
		currentPageRef.current as number,
		cachedPageDimensions,
		pages,
		pageNumbers
	);

	if (newResponsiveScale && responsiveScale !== newResponsiveScale) {
		const containerHeight = initialContainerHeight / newResponsiveScale;

		setSizeData({ responsiveScale: newResponsiveScale, containerHeight });
	}
}

const PageZoomControl = ({ pages, pageNumbers }: { pages: Pages; pageNumbers: PageNumbers }) => {
	//TODO-RC: zoom queue
	//TODO-RC: correct for AppBar height (useRef?)
	const currentPage = useSelector(getCurrentPage);
	useEffect(() => {
		// this does do nothing for whatever reason?
		//listRef.current?.scrollToItem(pageToIndex(currentPage), "start");
		const pageNode = pages.get(pageNumbers.get(currentPage));
		(pageNode as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
	}, [currentPage, pages, pageNumbers]);

	return null;
};

export const PageMaterialPairList = ({
	pdfProxyRef,
	pageDimensions,
}: {
	pdfProxyRef: RefObject<pdfjs.PDFDocumentProxy | undefined>;
	pageDimensions: PageDimensions;
}) => {
	const [listSizeData, setListSizeData] = useState({
		containerHeight: pageDimensions.initialContainerHeight,
		responsiveScale: 1,
	});
	const currentPageRef = useRef(1);
	const listRef = useRef<VariableSizeList>();

	const resizeHandler = () => {
		handleResize(
			currentPageRef,
			pageDimensions.cachedPageDimensions,
			pageDimensions.pages,
			pageDimensions.pageNumbers,
			listSizeData.responsiveScale,
			listSizeData.containerHeight,
			setListSizeData
		);
		listRef.current?.resetAfterIndex(0);
	};

	//const widthRef = useRef<number>(window.innerWidth);
	// can not use dependency-arr because we DONT want to execute on first render
	// only if after that the width changed
	// height is not important, because we overflow anyways
	// useEffect(() => {
	// 	document.addEventListener("resize", resizeHandler);
	// 	// const innerWidth =
	// 	// // need > 50 to avoid glitches where width is only slightly corrected
	// 	// //TODO-NICE: depend on height change, but maybe same problem?
	// 	// if (widthRef.current !== window.innerWidth) {
	// 	// 	console.log("resizing PageList because of width-change", widthRef.current, width);
	// 	// 	widthRef.current = width;
	// 	// 	resizeHandler();
	// 	// }
	// 	return () => {
	// 		document.removeEventListener("resize", resizeHandler);
	// 	};
	// });

	// const widthRef = useRef<number>(width);
	// // can not use dependency-arr because we DONT want to execute on first render
	// // only if after that the width changed
	// // height is not important, because we overflow anyways
	// useLayoutEffect(() => {
	// 	// need > 50 to avoid glitches where width is only slightly corrected
	// 	//TODO-NICE: depend on height change, but maybe same problem?
	// 	if (widthRef.current !== width && Math.abs(widthRef.current - width) > 50) {
	// 		console.log("resizing PageList because of width-change", widthRef.current, width);
	// 		widthRef.current = width;
	// 		resizeHandler();
	// 	}
	// });

	return (
		<Fragment>
			<VariableSizeList
				height={listSizeData.containerHeight}
				itemCount={(pdfProxyRef.current as pdfjs.PDFDocumentProxy).numPages}
				itemSize={(index: number) =>
					computeRowHeight(index, pageDimensions.cachedPageDimensions, listSizeData.responsiveScale)
				}
				itemData={{
					numPages: (pdfProxyRef.current as pdfjs.PDFDocumentProxy).numPages,
					listRef,
					triggerResize: resizeHandler,
					pages: pageDimensions.pages,
					pageNumbers: pageDimensions.pageNumbers,
				}}
				overscanCount={2}
				onItemsRendered={(props: { visibleStopIndex: number }) => {
					console.log(props);
					//currentPageRef.current = visibleStopIndex + 1;
				}}
				ref={listRef as RefObject<VariableSizeList>}
				width="100%"
			>
				{PageMaterialPair}
			</VariableSizeList>
			<PageZoomControl pages={pageDimensions.pages} pageNumbers={pageDimensions.pageNumbers}></PageZoomControl>
		</Fragment>
	);
};
