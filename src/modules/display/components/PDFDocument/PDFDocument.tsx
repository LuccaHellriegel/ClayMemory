import "./PDFDocument.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import React, { useState, useRef, useEffect } from "react";
import { pdfjs, Document } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { materialLoaded, setPage } from "../../actions";
import { getPDF, getWindowMeasurements } from "../../selectors";
import text from "../../../text";
import { cachePageDimensions } from "./cachePageDimensions";
import { PageMaterialPairList } from "./PageMaterialPairList";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type CachedPageDimensions = Map<number, [number, number]>;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

//TODO-NICE: implement more pdf-reader functionality, like zoom

//TODO-RC: zoom to current page if it is already set on reload

export const PDFDocument = () => {
	const pdf = useSelector(getPDF);

	const [cachedPageDimensions, setPageDimensions] = useState<CachedPageDimensions | undefined>();

	const pdfProxyRef = useRef<pdfjs.PDFDocumentProxy | undefined>();

	const dispatch = useDispatch();

	// used for abborting pageDimension-cache-collection
	const pdfName = pdf?.name;
	const pdfNameRef = useRef(pdfName);
	if (pdfNameRef.current !== pdfName) {
		pdfNameRef.current = pdfName;
	}

	//TODO-RC: actualize currentPage so that pageChooser is correct

	//TODO-RC:
	// const zoomTargetSpanIndex = useSelector(getZoomTarget);

	// useEffect(() => {
	// 	if (!!zoomTargetSpanIndex && pdf) {
	// 		dispatch(scrollToZoomTarget());
	// 	}
	// }, [zoomTargetSpanIndex, pdf, dispatch]);

	return (
		<Document
			loading={text.constants.loadingMaterialText}
			noData={text.constants.noMaterialText}
			options={options}
			file={pdf}
			renderMode="canvas"
			onLoadSuccess={(pdfProxy) => {
				dispatch(materialLoaded(pdfProxy.numPages));
				if (pdf) cachePageDimensions(pdfProxy, pdfName as string, pdfNameRef, setPageDimensions);
				pdfProxyRef.current = pdfProxy;
			}}
			onItemClick={({ pageNumber }) => {
				dispatch(setPage(parseInt(pageNumber)));
			}}
		>
			{cachedPageDimensions && pdfNameRef.current === pdfName && (
				<PageMaterialPairList
					pdfProxyRef={pdfProxyRef}
					cachedPageDimensions={cachedPageDimensions}
				></PageMaterialPairList>
			)}
		</Document>
	);
};
