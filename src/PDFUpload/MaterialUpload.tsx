import React from "react";
import { connect } from "react-redux";

function MaterialUpload({ onUpload }: { onUpload: (event: any) => void }) {
	return <input onChange={onUpload} type="file" accept=".pdf" />;
}

export const FILE = "FILE";

function file(file: File) {
	return { file, type: FILE };
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: any) {
	return {
		onUpload: (event: any) => {
			dispatch(file(event.target.files[0]));
		},
	};
}

export const MaterialUploadContainer = connect(mapStateToProps, mapDispatchToProps)(MaterialUpload);
