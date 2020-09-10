import React from "react";
import { Page } from "react-pdf";
import { PageKeyboardControl } from "./PageKeyboardControl";
import selection from "../../../selection";
import { useSelector } from "react-redux";
import { getWindowMeasurements } from "../../selectors";
import { MaterialMultiplier } from "./PageMaterialPair";

const removeTextLayerOffset = () => {
	const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
	textLayers.forEach((layer) => {
		const { style }: any = layer;
		style.top = "0";
		style.left = "0";
		style.transform = "";
	});
};

export const PDFPage = ({ pageNumber }: { pageNumber: number }) => {
	//assumption is that the list checks for width before rendering
	const materialWidth = useSelector(getWindowMeasurements)?.width as number;

	return (
		<selection.components.MaterialMouseUp page={pageNumber}>
			<PageKeyboardControl>
				<Page
					pageNumber={pageNumber}
					width={materialWidth * MaterialMultiplier}
					onRenderSuccess={() => {
						//TODO-RC: check if this still works
						removeTextLayerOffset();
					}}
				/>
			</PageKeyboardControl>
		</selection.components.MaterialMouseUp>
	);
};
