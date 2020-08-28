import "./PDFDocument.css";
import "./AnnotationLayer.css";
import React, { RefObject, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect, useDispatch, useSelector } from "react-redux";
import { materialLoaded, setPage, captureMaterialData, setMaterialHeight, emptyZoomQueue } from "../../actions";
import { getRenderCritialData, getMaterialHeight, getZoomQueue } from "../../selectors";
import { loadingMaterialText, noMaterialText } from "../../../../shared/text";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//TODO-NICE: implent more pdf-reader functionality, like zoom

function removeTextLayerOffset() {
	const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
	textLayers.forEach((layer) => {
		const { style }: any = layer;
		style.top = "0";
		style.left = "0";
		style.transform = "";
	});
}

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

function PDFDocument({
	parentSize,
	pdf,
	currentPage,
	materialLoaded,
	captureMaterialData,
	documentRef,
}: {
	parentSize: any;
	pdf: File | undefined;
	currentPage: number;
	materialLoaded: (numPages: number) => void;
	captureMaterialData: Function;
	documentRef: RefObject<any>;
}) {
	const dispatch = useDispatch();

	const materialHeight = useSelector(getMaterialHeight);

	//TODO-RC: leads to render-problems?
	// first setting
	if (!materialHeight) {
		dispatch(setMaterialHeight(parentSize.height));
	}

	// setting if changed
	if (materialHeight && materialHeight !== parentSize.height) {
		dispatch(setMaterialHeight(parentSize.height));
	}
	//TODO-NICE: this is not a queue...
	const zoomQueue = useSelector(getZoomQueue);

	useEffect(() => {
		if (!!zoomQueue && pdf) {
			dispatch(emptyZoomQueue());
		}
	}, [zoomQueue, pdf, dispatch]);

	return (
		<Document
			file={pdf}
			options={options}
			onLoadSuccess={({ numPages }) => {
				materialLoaded(numPages);
			}}
			inputRef={documentRef}
			onItemClick={({ pageNumber }) => {
				dispatch(setPage(parseInt(pageNumber)));
			}}
			loading={loadingMaterialText}
			noData={noMaterialText}
		>
			{pdf && (
				<Page
					width={parentSize.width}
					pageNumber={currentPage}
					onRenderSuccess={() => {
						removeTextLayerOffset();
						captureMaterialData(documentRef);
					}}
				/>
			)}
		</Document>
	);
}

export const PDFDocumentContainer = connect(getRenderCritialData, {
	materialLoaded,
	captureMaterialData,
})(PDFDocument);
