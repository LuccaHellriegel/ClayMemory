import React, { PureComponent, createRef } from "react";
import { VariableSizeList } from "react-window";
import { debounce } from "throttle-debounce";
import { PDFPageRenderer } from "./PDFPageRenderer";
import { pdfjs, Document } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//TODO-RC: https://react-window.now.sh/#/examples/list/fixed-size

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader-invert line-scale">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export class PDFViewer extends PureComponent<any, any, any> {
	// static propTypes = {
	// 	scale: PropTypes.number.isRequired,
	// };

	static defaultProps = {
		scale: 1.2,
	};

	props: any;
	state: any;

	private _callOrientationChangeHandler: any;
	private _callResizeHandler: any;
	private _list: React.RefObject<any>;
	private _mounted: boolean = false;

	constructor(props: { pdfFile: any }) {
		super({ ...props, scale: 1.2 });

		this.state = {
			initialContainerHeight: null,
			containerHeight: null,
			pdf: null,
			currentPage: 1,
			cachedPageDimensions: null,
			responsiveScale: 1,
			pageNumbers: new Map(),
			pages: new WeakMap(),
		};

		this._list = createRef();

		this._callResizeHandler = debounce(50, this.handleResize.bind(this));
		this._callOrientationChangeHandler = debounce(1000, this.handleResize.bind(this));
	}

	componentDidMount() {
		console.log("mounting");
		this._mounted = true;
		window.addEventListener("resize", this._callResizeHandler);
		window.addEventListener("orientationchange", this._callOrientationChangeHandler);
	}

	componentWillUnmount() {
		this._mounted = false;
		window.removeEventListener("resize", this._callResizeHandler);
		window.removeEventListener("orientationchange", this._callOrientationChangeHandler);
	}

	/**
	 * Load all pages so we can cache all page dimensions.
	 *
	 * @param {Object} pdf
	 * @returns {void}
	 */
	cachePageDimensions(pdf: any) {
		const promises = Array.from({ length: pdf.numPages }, (v, i) => i + 1).map((pageNumber) => pdf.getPage(pageNumber));

		let height = 0;

		// Assuming all pages may have different heights. Otherwise we can just
		// load the first page and use its height for determining all the row
		// heights.
		Promise.all(promises).then((pages) => {
			if (!this._mounted) {
				return;
			}

			const pageDimensions = new Map();
			for (const page of pages) {
				const w = page.view[2] * this.props.scale;
				const h = page.view[3] * this.props.scale;

				console.log(this.props.scale, page, [w, h]);

				pageDimensions.set(page._pageIndex + 1, [w, h]);
				height += h;
			}

			console.log(pages, pageDimensions);

			this.setState({
				cachedPageDimensions: pageDimensions,
				initialContainerHeight: height,
				containerHeight: height,
			});
		});
	}

	recomputeRowHeights() {
		this._list.current.resetAfterIndex(0);
	}

	computeRowHeight(index: number) {
		const { cachedPageDimensions, responsiveScale } = this.state;
		if (cachedPageDimensions && responsiveScale) {
			return cachedPageDimensions.get(index + 1)[1] / responsiveScale;
		}

		return 768; // Initial height
	}

	onDocumentLoadSuccess(pdf: any) {
		this.setState({ pdf });
		this.cachePageDimensions(pdf);
	}

	updateCurrentVisiblePage({ visibleStopIndex }: any) {
		this.setState({ currentPage: visibleStopIndex + 1 });
	}

	computeResponsiveScale(pageNumber: any) {
		const { cachedPageDimensions, pages, pageNumbers } = this.state;

		const node = pages.get(pageNumbers.get(pageNumber));

		if (!node) return;

		return cachedPageDimensions.get(pageNumber)[1] / node.clientHeight;
	}

	handleResize() {
		const { currentPage, responsiveScale, initialContainerHeight } = this.state;

		// Recompute the responsive scale factor on window resize
		const newResponsiveScale = this.computeResponsiveScale(currentPage);

		if (newResponsiveScale && responsiveScale !== newResponsiveScale) {
			const containerHeight = initialContainerHeight / newResponsiveScale;

			this.setState({ responsiveScale: newResponsiveScale, containerHeight }, () => this.recomputeRowHeights());
		}
	}

	render() {
		const { scale } = this.props;
		const { cachedPageDimensions, containerHeight, pdf, pages, pageNumbers } = this.state;

		return (
			<Document
				file={this.props.pdfFile}
				loading={<Loader />}
				onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
				onLoadError={(error) => console.error(error)} // eslint-disable-line no-console
			>
				{cachedPageDimensions && (
					<VariableSizeList
						height={containerHeight}
						itemCount={pdf.numPages}
						itemSize={this.computeRowHeight.bind(this)}
						itemData={{
							scale,
							pages,
							pageNumbers,
							numPages: pdf.numPages,
							triggerResize: this.handleResize.bind(this),
						}}
						overscanCount={2}
						onItemsRendered={this.updateCurrentVisiblePage.bind(this)}
						ref={this._list}
						width="100%"
					>
						{PDFPageRenderer}
					</VariableSizeList>
				)}
			</Document>
		);
	}
}
