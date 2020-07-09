import { ChangeEvent } from "react";

export const PDF_UPLOADED = "PDF_UPLOADED";

export function pdfUploaded(event: ChangeEvent<HTMLInputElement>) {
	const files = event.target.files;
	return { type: PDF_UPLOADED, pdf: files ? files[0] : null };
}

export const pdf = (state = null, { type, pdf }: { type: string; pdf: File }) => {
	// fun fact: default Redux DevTools displays File Objects as {} because of JSON.stringify
	switch (type) {
		case PDF_UPLOADED:
			return pdf;
		default:
			return state;
	}
};
