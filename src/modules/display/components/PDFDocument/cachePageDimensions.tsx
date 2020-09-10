import { RefObject } from "react";
import { pdfjs } from "react-pdf";
import { CachedPageDimensions } from "./PDFDocument";

//TODO-NICE: use more robust method than pdfName to differentiate pdfs
//TODO-NICE: test if this abort actually works? once the function was entered,
// is it guaranteed that it will finish before other changes?
export const cachePageDimensions = (
	pdfProxy: pdfjs.PDFDocumentProxy,
	pdfName: string,
	pdfNameRef: RefObject<string | null | undefined>,
	setPageDimensions: (dims: CachedPageDimensions) => void
) => {
	const promises = Array.from({ length: pdfProxy.numPages }, (_, i) => i + 1).map((pageNumber) =>
		pdfProxy.getPage(pageNumber)
	);

	// Assuming all pages may have different heights. Otherwise we can just
	// load the first page and use its height for determining all the row
	// heights.
	Promise.all((promises as unknown) as Promise<any>[]).then((pages: pdfjs.PDFPageProxy[]) => {
		// a different pdf was loaded while these promises where executing
		if (pdfName !== pdfNameRef.current) {
			return;
		}

		const pageDimensions = new Map();

		//TODO-NICE: zooming needs a scale
		const scale = 1;
		for (const page of pages) {
			const w = page.view[2] * scale;
			const h = page.view[3] * scale;

			// react-pdf 4.0.5 types are incorrect, _pageIndex is correct and not just pageIndex
			pageDimensions.set(((page as unknown) as { _pageIndex: number })._pageIndex + 1, [w, h]);
		}

		setPageDimensions(pageDimensions);
	});
};
