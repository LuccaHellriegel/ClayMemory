export const PDF_RENDERED = "PDF_RENDERED";

//TODO: make Document Navigation Bar separate component
export type PDFRenderStatus = { rendered: boolean; numPages?: number; curPage?: number };

export const pdfRendered = () => {
	console.log(pdfRendered);
	return { type: PDF_RENDERED, PDFRenderStatus: true };
};

export const pdfRenderStatus = (
	state = false,
	{ type, PDFRenderStatus }: { type: string; PDFRenderStatus: boolean }
) => {
	switch (type) {
		case PDF_RENDERED:
			return PDFRenderStatus;
		default:
			return state;
	}
};
