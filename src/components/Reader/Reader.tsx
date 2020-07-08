import "./PDF.css";
import "./AnnotationLayer.css";
import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect } from "react-redux";
import { pdfLoaded, pageDataAction, PageDataType, pageDataActionAsync } from "./ReaderActionsReducers";
import { getSpanDataGroups } from "../../services/SpanService";
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
	PDF,
	parentSize,
	pageDataAction,
	pageDataActionAsync,
	pdfLoaded,
	page,
}: {
	PDF: File;
	parentSize: any;
	pageDataAction: (pageData: PageDataType) => void;
	pageDataActionAsync: (container: HTMLDivElement) => void;
	pdfLoaded: (numPages: number) => void;
	page: number;
}) {
	//TODO: Control / numPages

	return (
		<Document
			file={PDF}
			options={options}
			onLoadSuccess={({ numPages }) => {
				pdfLoaded(numPages);
			}}
		>
			{PDF && (
				<Page
					width={parentSize.width}
					pageNumber={page}
					onRenderSuccess={() => {
						const container = document.querySelector("div.react-pdf__Document");
						if (container) {
							const dataGroups = getSpanDataGroups(container as HTMLDivElement);
							// from MutationObserver experiments, we know that the text-layer is not guaranteed to be rendered on render "success"
							if (!dataGroups) {
								pageDataActionAsync(container as HTMLDivElement);
							} else {
								pageDataAction({ ...dataGroups, time: Date.now() });
							}
						} else {
							throw "No container found!";
						}
						removeTextLayerOffset();
					}}
				/>
			)}
		</Document>
	);
}

function mapStateToProps(state: any) {
	return { PDF: state.pdf, page: state.page };
}

export const PDFDocumentContainer = connect(mapStateToProps, { pageDataAction, pageDataActionAsync, pdfLoaded })(
	PDFDocument
);
