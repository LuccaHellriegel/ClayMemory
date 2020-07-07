import "./PDF.css";
import "./AnnotationLayer.css";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect } from "react-redux";
import { DocumentCanvasContainer } from "../DocumentCanvas/DocumentCanvas";
import { PDFUploadContainer } from "../PDFUpload/PDFUpload";
import { pdfRendered } from "./ReaderActionsReducers";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFMaterial({ PDF, parentSize, pdfRendered }: { PDF: File; parentSize: any; pdfRendered: () => void }) {
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function removeTextLayerOffset() {
		const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
		textLayers.forEach((layer) => {
			const { style }: any = layer;
			style.top = "0";
			style.left = "0";
			style.transform = "";
		});
	}

	function changePage(offset: any) {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	}

	function previousPage() {
		changePage(-1);
	}

	function nextPage() {
		changePage(1);
	}

	const options = {
		cMapUrl: "cmaps/",
		cMapPacked: true,
	};

	return (
		<div
			style={
				{
					//outline: "solid green"
				}
			}
			onKeyDown={(event: any) => {
				console.log("here");
				event.preventDefault();
				if (event.key === "ArrowLeft") {
					console.log("here");
				}
			}}
		>
			<DocumentCanvasContainer></DocumentCanvasContainer>
			<Document file={PDF} onLoadSuccess={onDocumentLoadSuccess} options={options}>
				<Page
					width={parentSize.width}
					pageNumber={pageNumber}
					onLoadSuccess={() => {
						removeTextLayerOffset();
					}}
					onRenderSuccess={pdfRendered}
				/>
			</Document>

			<div>
				<p>
					Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
				</p>
				<button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
					Previous
				</button>
				<button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
					Next
				</button>
			</div>

			<PDFUploadContainer></PDFUploadContainer>
		</div>
	);
}

function mapStateToProps(state: any) {
	return { PDF: state.pdf };
}

export const ReaderContainer = connect(mapStateToProps, { pdfRendered })(PDFMaterial);
