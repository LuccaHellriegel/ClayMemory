import React from "react";
import { Page } from "react-pdf";
import { PageKeyboardControl } from "./PageKeyboardControl";
import selection from "../../../selection";
import { useSelector } from "react-redux";
import { getWindowMeasurements } from "../../selectors";
import { MaterialMultiplier } from "./PageMaterialPairList";

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
						console.log("rendered Page " + pageNumber);
					}}
				/>
			</PageKeyboardControl>
		</selection.components.MaterialMouseUp>
	);
};
