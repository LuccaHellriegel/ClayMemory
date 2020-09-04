import React from "react";
import { Page } from "react-pdf";

export const PDFPageRenderer = ({
	index,
	data,
	style,
}: {
	index: number;
	data: {
		scale: number;
		numPages: number;
		triggerResize: Function;
		pages: WeakMap<any, any>;
		pageNumbers: WeakMap<any, any>;
	};
	style: any;
}) => {
	const { scale, numPages, triggerResize } = data;
	const pageNumber = index + 1;

	return (
		<div {...{ style }}>
			<div
				ref={(ref) => {
					const { pages, pageNumbers } = data;
					if (!pageNumbers.has(pageNumber)) {
						const key = { pageNumber };
						pageNumbers.set(pageNumber, key);
					}
					pages.set(pageNumbers.get(pageNumber), ref);
				}}
			>
				<Page
					{...{ pageNumber }}
					{...{ scale }}
					renderAnnotationLayer={false}
					onLoadError={(error) => console.error(error) /* eslint-disable-line no-console */}
					onLoadSuccess={(page) => {
						// This is necessary to ensure the row heights of
						// the variable list are correctly initialised.
						if (page.pageNumber === numPages) {
							triggerResize();
						}
					}}
				/>
			</div>
		</div>
	);
};
