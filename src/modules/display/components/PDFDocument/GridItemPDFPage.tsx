import React, { useLayoutEffect } from "react";
import { Page } from "react-pdf";
import { Grid } from "@material-ui/core";
import { withSize } from "react-sizeme";
import { PageKeyboardControl } from "./PageKeyboardControl";
import selection from "../../../selection";

const removeTextLayerOffset = () => {
	const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
	textLayers.forEach((layer) => {
		const { style }: any = layer;
		style.top = "0";
		style.left = "0";
		style.transform = "";
	});
};

type PDFPageProps = {
	pageNumber: number;
	numPages: number;
	width: number;
	triggerResize: () => void;
};

const PDFPage = ({ pageNumber, numPages, width, triggerResize }: PDFPageProps) => {
	//TODO-RC: fix resize problem
	// const widthRef = useRef<number>(width);
	// // // can not use dependency-arr because we DONT want to execute on first render
	// // // only if after that the width changed
	// // // height is not important, because we overflow anyways
	// useLayoutEffect(() => {
	// 	// need > 50 to avoid glitches where width is only slightly corrected
	// 	//TODO-NICE: depend on height change, but maybe same problem?
	// 	if (widthRef.current !== width) {
	// 		console.log("resizing PageList because of width-change", widthRef.current, width);
	// 		widthRef.current = width;
	// 		triggerResize();
	// 	}
	// });

	return (
		<selection.components.MaterialMouseUp page={pageNumber}>
			<PageKeyboardControl>
				<Page
					pageNumber={pageNumber}
					width={width}
					onRenderSuccess={() => {
						//TODO-RC: pretty sure react-window just renders everything instead of only partly...
						// test this with a test-list
						//TODO-RC: make Width-measurement either by hand or make extra component, re-rendering the page is too slow
						console.log("rendering " + pageNumber);
						removeTextLayerOffset();
					}}
					onLoadSuccess={(page) => {
						// This is necessary to ensure the row heights of
						// the variable list are correctly initialised on the first render.
						if (page.pageNumber === numPages) {
							triggerResize();
						}
					}}
				/>
			</PageKeyboardControl>
		</selection.components.MaterialMouseUp>
	);
};

export const GridItemPDFPage = withSize({ monitorHeight: true })(
	({
		pdfPageOuterProps,
		style,
		size,
		materialHeight,
		setMaterialHeight,
	}: {
		pdfPageOuterProps: Omit<PDFPageProps, "width">;
		style: any;
		size: { width: number; height: number };
		materialHeight: number;
		setMaterialHeight: (materialHeight: number) => void;
	}) => {
		//TODO-RC: fix resize problem
		useLayoutEffect(() => {
			if (size.height !== materialHeight) {
				setMaterialHeight(size.height);
			}
		});

		return (
			<Grid item style={style}>
				<PDFPage {...pdfPageOuterProps} width={size.width}></PDFPage>
			</Grid>
		);
	}
);
