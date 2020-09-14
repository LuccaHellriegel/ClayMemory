import React, { RefObject, useRef, Fragment, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { VariableSizeList } from "react-window";
import { PageMaterialPair } from "./PageMaterialPair";
import { CachedPageDimensions } from "./PDFDocument";
import { getCurrentPage, getWindowMeasurements } from "../../selectors";
import { useSelector } from "react-redux";

const PageZoomControl = ({ listRef }: { listRef: RefObject<any> }) => {
	//TODO-RC: zoom queue
	//TODO-RC: correct for AppBar height (useRef?)
	const currentPage = useSelector(getCurrentPage);
	// TODO-RC: first scroll, necessary?
	listRef.current?.scrollToItem(currentPage - 1, "smart");
	useEffect(() => {
		listRef.current?.scrollToItem(currentPage - 1, "smart");
	}, [listRef, currentPage]);

	return null;
};

export const MaterialMultiplier = 0.57;

const calculateMaterialHeight = (
	pageNumber: number,
	cachedPageDimensions: CachedPageDimensions,
	windowWidth: number
) => {
	const pageDims = cachedPageDimensions.get(pageNumber) as [number, number];
	const materialWidth = windowWidth * MaterialMultiplier;

	const userSpaceUnitWidth = pageDims[0];
	const pixelPerUserSpaceUnit = materialWidth / userSpaceUnitWidth;
	const materialHeight = pageDims[1] * pixelPerUserSpaceUnit;

	const extraSpaceBetweenMaterialPages = 20;
	return materialHeight + extraSpaceBetweenMaterialPages;
};

export const PageMaterialPairList = ({
	pdfProxyRef,
	cachedPageDimensions,
}: {
	pdfProxyRef: RefObject<pdfjs.PDFDocumentProxy | undefined>;
	cachedPageDimensions: CachedPageDimensions;
}) => {
	const listRef = useRef<VariableSizeList>();

	const windowMeasurements = useSelector(getWindowMeasurements);
	const materialHeights = windowMeasurements
		? Array.from(cachedPageDimensions.keys()).reduce((prev, pageNumber) => {
				prev.set(pageNumber, calculateMaterialHeight(pageNumber, cachedPageDimensions, windowMeasurements.width));
				return prev;
		  }, new Map<number, number>())
		: undefined;

	return (
		<Fragment>
			{windowMeasurements && materialHeights && (
				<VariableSizeList
					height={windowMeasurements.height}
					itemCount={(pdfProxyRef.current as pdfjs.PDFDocumentProxy).numPages}
					itemSize={(index: number) => materialHeights.get(index + 1) as number}
					itemData={{
						materialHeights,
					}}
					overscanCount={2}
					ref={listRef as RefObject<VariableSizeList>}
					width="100%"
				>
					{PageMaterialPair}
				</VariableSizeList>
			)}
			<PageZoomControl listRef={listRef as RefObject<VariableSizeList>}></PageZoomControl>
		</Fragment>
	);
};
