import "./PDFDocument.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import React, { useState, useRef } from "react";
import { pdfjs, Document } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { getPDF } from "../../selectors";
import text from "../../../text";
import { cachePageDimensions } from "./cachePageDimensions";
import { RiverMaterialPairList } from "./RiverMaterialPairList";
import { actions } from "../../slice";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type CachedPageDimensions = Map<number, [number, number]>;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

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
				dispatch(actions.totalPages(pdfProxy.numPages));
				if (pdf) cachePageDimensions(pdfProxy, pdfName as string, pdfNameRef, setPageDimensions);
				pdfProxyRef.current = pdfProxy;
			}}
			onItemClick={({ pageNumber }) => {
				dispatch(actions.pageUpdate({ page: parseInt(pageNumber), shouldScroll: true }));
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
