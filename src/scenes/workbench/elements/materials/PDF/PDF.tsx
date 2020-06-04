import "./PDF.css";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect } from "react-redux";
import { withSize } from "react-sizeme";
import { MaterialUploadContainer } from "./PDFUpload/PDFUpload";
import "./AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//TODO: weird behavior if Link is the end of the page (and the sentence continues in the next page)
//Solution: if link big as page, then remove it
function PDFMaterial({ file }: { file: File }) {
	console.log("Rendering PDFMaterial");

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

	//TODO: withSize around Document -> is overflowing div also
	return (
		<div className="PDFMaterial">
			<Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
				<Page pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
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

			<MaterialUploadContainer></MaterialUploadContainer>
		</div>
	);
}

export const ELE_SIZE = "ELE_SIZE";

function eleSize(size: { width: number; height: number }) {
	console.log("here");
	return { size, type: ELE_SIZE };
}

function mapStateToProps(state: any) {
	return { file: state.file };
}

// TODO: save eleSize to component id?
function mapDispatchToProps(dispatch: any) {
	//return {};
	return {
		onSize: (size: any) => {
			dispatch(eleSize(size));
		},
	};
}

const PDFMaterialWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(PDFMaterial);
export const PDFMaterialContainer = connect(mapStateToProps, mapDispatchToProps)(PDFMaterialWithSize);
