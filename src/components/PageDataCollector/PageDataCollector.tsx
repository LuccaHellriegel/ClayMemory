import { connect } from "react-redux";
import { pageDataAction } from "./PageDataCollectorActionsReducers";

function PageDataCollector({
	PDFRenderStatus,
	dispatchPageData,
}: {
	PDFRenderStatus: any;
	dispatchPageData: (container: HTMLDivElement) => void;
}) {
	if (PDFRenderStatus) {
		// TODO: Make React-ly solution for getting this here? Access Document ref?
		// assumes there is only one document
		const container = document.querySelector("div.react-pdf__Document");
		if (container) dispatchPageData(container as HTMLDivElement);
	}
	return null;
}

function mapStateToProps(state: any) {
	return { PDFRenderStatus: state.pdfRenderStatus };
}

export const PageDataCollectorContainer = connect(mapStateToProps, { dispatchPageData: pageDataAction })(
	PageDataCollector
);
