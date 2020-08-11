import "./PDFDocument.css";
import "./AnnotationLayer.css";
import React, { RefObject } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect, useDispatch } from "react-redux";
import { materialLoaded, materialRendered, setPage } from "../../actions";
import { getRenderCritialData } from "../../selectors";
import analyze from "../../../analyze";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
	materialRendered,
	materialLoaded,
	captureMaterialData,
	documentRef,
}: {
	parentSize: any;
	pdf: File | undefined;
	currentPage: number;
	materialRendered: Function;
	materialLoaded: (numPages: number) => void;
	captureMaterialData: Function;
	documentRef: RefObject<any>;
}) {
	const dispatch = useDispatch();
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
		>
			{pdf && (
				<Page
					width={parentSize.width}
					pageNumber={currentPage}
					onRenderSuccess={() => {
						removeTextLayerOffset();
						materialRendered();
						captureMaterialData(documentRef);
					}}
				/>
			)}
		</Document>
	);
}

export const PDFDocumentContainer = connect(getRenderCritialData, {
	materialRendered,
	materialLoaded,
	captureMaterialData: analyze.actions.captureMaterialData,
})(PDFDocument);
