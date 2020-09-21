import "./PDFDocument.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import React, { useState, useRef } from "react";
import { pdfjs, Document } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { materialLoaded, setPage } from "../../actions";
import { getPDF } from "../../selectors";
import text from "../../../text";
import { cachePageDimensions } from "./cachePageDimensions";
import { RiverMaterialPairList } from "./RiverMaterialPairList";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type CachedPageDimensions = Map<number, [number, number]>;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

//TODO-NICE: implement more pdf-reader functionality, like zoom
// make pdf zoomable, right now it just sizes with the screen (can be too small)
// good enough right now because one can hide the river if one needs more space

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
				dispatch(setPage(parseInt(pageNumber), true));
			}}
		>
			{cachedPageDimensions && pdfNameRef.current === pdfName && (
				<RiverMaterialPairList
					pdfProxyRef={pdfProxyRef}
					cachedPageDimensions={cachedPageDimensions}
				></RiverMaterialPairList>
			)}
		</Document>
	);
};
