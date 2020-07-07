import { connect } from "react-redux";
import { pdfUploaded } from "./PDFUploadActionsReducers";
import React, { ChangeEvent } from "react";

function PDFUpload({ onUpload }: { onUpload: (event: ChangeEvent<HTMLInputElement>) => void }) {
	return <input onChange={onUpload} type="file" accept=".pdf" />;
}

export const PDFUploadContainer = connect(null, { onUpload: pdfUploaded })(PDFUpload);
