import { ChangeEvent } from "react";

export const PDF_UPLOADED = "PDF_UPLOADED";

export function pdfUploaded(event: ChangeEvent<HTMLInputElement>) {
	const files = event.target.files;
	return { type: PDF_UPLOADED, PDF: files ? files[0] : null };
}

export const pdf = (state = null, { type, PDF }: { type: string; PDF?: File }) => {
	// fun fact: default Redux DevTools displays File Objects as {} because of JSON.stringify
	// spend like 20 minutes on that, but good to know that my code works...
	switch (type) {
		case PDF_UPLOADED:
			return PDF;
		default:
			return state;
	}
};
