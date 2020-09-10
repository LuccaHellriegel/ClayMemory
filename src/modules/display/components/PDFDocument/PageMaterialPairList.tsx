import React, { RefObject, useRef, Fragment, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { VariableSizeList } from "react-window";
import { PageMaterialPair, calculateMaterialHeight } from "./PageMaterialPair";
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

export const PageMaterialPairList = ({
	pdfProxyRef,
	cachedPageDimensions,
}: {
	pdfProxyRef: RefObject<pdfjs.PDFDocumentProxy | undefined>;
	cachedPageDimensions: CachedPageDimensions;
}) => {
	const listRef = useRef<VariableSizeList>();

	const windowMeasurements = useSelector(getWindowMeasurements);

	return (
		<Fragment>
			{windowMeasurements && (
				<VariableSizeList
					height={windowMeasurements.height}
					itemCount={(pdfProxyRef.current as pdfjs.PDFDocumentProxy).numPages}
					itemSize={(index: number) =>
						calculateMaterialHeight(index + 1, cachedPageDimensions, windowMeasurements.width)
					}
					itemData={{
						cachedPageDimensions,
					}}
					overscanCount={3}
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
