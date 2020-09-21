import React, { RefObject, useRef, Fragment } from "react";
import { pdfjs } from "react-pdf";
import { VariableSizeList } from "react-window";
import { RiverMaterialPair } from "./RiverMaterialPair";
import { CachedPageDimensions } from "./PDFDocument";
import { getTopOffset, getWindowMeasurements } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../actions";
import { PageScrollControl } from "./PageScrollControl";

export const MaterialMultiplier = 0.66;
export const RiverMultiplier = 0.32;

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

export const pairTopBottomPadding = 20;

export const RiverMaterialPairList = ({
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

	const dispatch = useDispatch();
	const topOffset = useSelector(getTopOffset);

	//TODO-RC: creating a new card from context-menu seems to focus / snap us on current-page

	return (
		<Fragment>
			{windowMeasurements && materialHeights && (
				<VariableSizeList
					height={windowMeasurements.height - topOffset}
					itemCount={(pdfProxyRef.current as pdfjs.PDFDocumentProxy).numPages}
					itemSize={(index: number) => (materialHeights.get(index + 1) as number) + pairTopBottomPadding}
					itemData={{
						materialHeights,
					}}
					ref={listRef as RefObject<VariableSizeList>}
					width="100%"
					onItemsRendered={(props) => {
						//TODO-NICE: find way to switch the page if it is halfway in sight
						dispatch(setPage(props.visibleStopIndex + 1, false));
					}}
				>
					{RiverMaterialPair}
				</VariableSizeList>
			)}
			<PageScrollControl listRef={listRef as RefObject<VariableSizeList>}></PageScrollControl>
		</Fragment>
	);
};
