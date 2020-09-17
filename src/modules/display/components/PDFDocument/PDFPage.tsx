import React, { Fragment, useRef } from "react";
import { Page } from "react-pdf";
import { PageKeyboardControl } from "./PageKeyboardControl";
import selection from "../../../selection";
import { useSelector } from "react-redux";
import { getWindowMeasurements } from "../../selectors";
import { MaterialMultiplier } from "./RiverMaterialPairList";
import { PageSpanControl } from "./PageSpanControl";

export const PDFPage = ({ pageNumber }: { pageNumber: number }) => {
	//assumption is that the list checks for width before rendering
	const materialWidth = useSelector(getWindowMeasurements)?.width as number;

	const pageRef = useRef<null | HTMLDivElement>(null);
	return (
		<Fragment>
			<selection.components.MaterialMouseUp page={pageNumber}>
				<PageKeyboardControl>
					<Page
						inputRef={(instance) => {
							pageRef.current = instance;
						}}
						pageNumber={pageNumber}
						width={materialWidth * MaterialMultiplier}
						onRenderSuccess={() => {
							console.log("rendered Page " + pageNumber);
						}}
					/>
				</PageKeyboardControl>
			</selection.components.MaterialMouseUp>
			<PageSpanControl page={pageNumber} pageRef={pageRef}></PageSpanControl>
		</Fragment>
	);
};
