import "./PDFDocument.css";
import "./AnnotationLayer.css";
import React, { useState, useRef } from "react";
import { pdfjs, Document } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { materialLoaded, setPage } from "../../actions";
import { getPDF, getDocumentRef } from "../../selectors";
import text from "../../../text";
import { cachePageDimensions } from "./cachePageDimensions";
import { PageMaterialPairList } from "./PageMaterialPairList";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type CachedPageDimensions = Map<number, [number, number]>;

export type PageDimensions = {
	// width and height per page
	cachedPageDimensions: CachedPageDimensions;
	initialContainerHeight: number;
	pages: Pages;
	pageNumbers: PageNumbers;
};

export type SizeData = { containerHeight: number; responsiveScale: number };

// this saves the dom nodes for all the pages
// to measure client-height when computing the current responsive scale
// it is a WeakMap because if the refs change, we want them to be garbage collected still
// e.g. on resize
export type Pages = WeakMap<any, any>;
// this saves {pageNumber : number} for all the pageNumbers as keys for the Pages-WeakMap
export type PageNumbers = Map<any, any>;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

//TODO-NICE: implement more pdf-reader functionality, like zoom

//TODO-RC: zoom to current page if it is already set on reload

export const PDFDocument = () => {
	const pdf = useSelector(getPDF);
	const documentRef = useSelector(getDocumentRef);

	const [pageDimensions, setPageDimensions] = useState<PageDimensions | undefined>();

	const pdfProxyRef = useRef<pdfjs.PDFDocumentProxy | undefined>();

	const dispatch = useDispatch();

	// used for abborting pageDimension-cache-collection
	const pdfName = pdf?.name;
	const pdfNameRef = useRef(pdfName);
	if (pdfNameRef.current !== pdfName) {
		pdfNameRef.current = pdfName;
	}

	//TODO-RC: race condition if loading a longer PDF after a shorter one?

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
			inputRef={documentRef}
			onLoadSuccess={(pdfProxy) => {
				dispatch(materialLoaded(pdfProxy.numPages));
				if (pdf) cachePageDimensions(pdfProxy, pdfName as string, pdfNameRef, setPageDimensions);
				pdfProxyRef.current = pdfProxy;
			}}
			onItemClick={({ pageNumber }) => {
				dispatch(setPage(parseInt(pageNumber)));
			}}
		>
			{pageDimensions && pdfNameRef.current === pdfName && (
				<PageMaterialPairList pdfProxyRef={pdfProxyRef} pageDimensions={pageDimensions}></PageMaterialPairList>
			)}
		</Document>
	);
};
