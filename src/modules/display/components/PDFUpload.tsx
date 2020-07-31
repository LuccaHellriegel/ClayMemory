import { connect } from "react-redux";
import React, { ChangeEvent } from "react";
import { materialUploaded } from "../actions";
import { getPDF } from "../selectors";

function PDFUpload({
	pdf,
	onUpload,
}: {
	pdf: File | undefined;
	onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
	return pdf ? null : <input onChange={onUpload} type="file" accept=".pdf" />;
}

export const PDFUploadContainer = connect(getPDF, { onUpload: materialUploaded })(PDFUpload);
