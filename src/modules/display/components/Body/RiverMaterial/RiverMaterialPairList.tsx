import React, { RefObject, useRef, Fragment, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { VariableSizeList } from "react-window";
import { pairTopBottomPadding, RiverMaterialPair } from "./RiverMaterialPair";
import { CachedPageDimensions } from "../../../../pdf/components/Document/PDFDocument";
import { getTopOffset, getWindowMeasurements } from "../../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { ListScrollControl } from "./ListScrollControl";
import pdf from "../../../../pdf";

const calculateMaterialHeight = (
	pageNumber: number,
	cachedPageDimensions: CachedPageDimensions,
	windowWidth: number
) => {
	const pageDims = cachedPageDimensions.get(pageNumber) as [number, number];
	const materialWidth = windowWidth * pdf.constants.MaterialMultiplier;

	const userSpaceUnitWidth = pageDims[0];
	const pixelPerUserSpaceUnit = materialWidth / userSpaceUnitWidth;
	const materialHeight = pageDims[1] * pixelPerUserSpaceUnit;

	const extraSpaceBetweenMaterialPages = 20;
	return materialHeight + extraSpaceBetweenMaterialPages;
};

const Resetter = ({
	listRef,
	materialHeights,
}: {
	listRef: RefObject<VariableSizeList>;
	materialHeights: Map<number, number>;
}) => {
	const ref = useRef(materialHeights);

	useEffect(() => {
		if (materialHeights !== ref.current) {
			listRef.current?.resetAfterIndex(0);
			ref.current = materialHeights;
		}
	});

	return null;
};

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
						//TODO: find way to switch the page if it is halfway in sight
						dispatch(pdf.actions.pageUpdate({ page: props.visibleStopIndex + 1, shouldScroll: false }));
					}}
				>
					{RiverMaterialPair}
				</VariableSizeList>
			)}
			{materialHeights && (
				<Resetter listRef={listRef as RefObject<VariableSizeList>} materialHeights={materialHeights}></Resetter>
			)}
			<ListScrollControl listRef={listRef as RefObject<VariableSizeList>}></ListScrollControl>
		</Fragment>
	);
};
