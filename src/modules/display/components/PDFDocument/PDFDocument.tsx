import "./PDFDocument.css";
import "./AnnotationLayer.css";
import React, { RefObject, useEffect, useLayoutEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { connect, useDispatch, useSelector } from "react-redux";
import { materialLoaded, setPage, captureMaterialData, setMaterialHeight, emptyZoomQueue } from "../../actions";
import { getRenderCritialData, getMaterialHeight, getZoomQueue } from "../../selectors";
import text from "../../../text";
import cards from "../../../cards";
import selection from "../../../selection";
import { PageKeyboardControl } from "./PageKeyboardControl";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//TODO-NICE: implent more pdf-reader functionality, like zoom

function removeTextLayerOffset() {
	const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
	textLayers.forEach((layer) => {
		const { style }: any = layer;
		style.top = "0";
		style.left = "0";
		style.transform = "";
	});
}

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
};

function PDFDocument({
	parentSize,
	pdf,
	currentPage,
	materialLoaded,
	captureMaterialData,
	documentRef,
}: {
	parentSize: any;
	pdf: File | undefined;
	currentPage: number;
	materialLoaded: (numPages: number) => void;
	captureMaterialData: Function;
	documentRef: RefObject<any>;
}) {
	const dispatch = useDispatch();

	const materialHeight = useSelector(getMaterialHeight);

	useLayoutEffect(() => {
		// first setting
		if (!materialHeight) {
			dispatch(setMaterialHeight(parentSize.height));
		}

		// setting if changed
		if (materialHeight && materialHeight !== parentSize.height) {
			dispatch(setMaterialHeight(parentSize.height));
		}
	}, [dispatch, materialHeight, parentSize.height]);

	//TODO-NICE: this is not a queue...
	const zoomQueue = useSelector(getZoomQueue);

	useEffect(() => {
		if (!!zoomQueue && pdf) {
			dispatch(emptyZoomQueue());
		}
	}, [zoomQueue, pdf, dispatch]);

	return (
		<span
			onMouseUp={() => {
				if (pdf) dispatch(mouseUpDocument());
			}}
		>
			<PageKeyboardControl>
				<Document
					file={pdf}
					options={options}
					onLoadSuccess={({ numPages }) => {
						materialLoaded(numPages);
					}}
					inputRef={documentRef}
					onItemClick={({ pageNumber }) => {
						dispatch(setPage(parseInt(pageNumber)));
					}}
					loading={text.constants.loadingMaterialText}
					noData={text.constants.noMaterialText}
				>
					{pdf && (
						<Page
							width={parentSize.width}
							pageNumber={currentPage}
							onRenderSuccess={() => {
								removeTextLayerOffset();
								captureMaterialData(documentRef);
							}}
						/>
					)}
				</Document>
			</PageKeyboardControl>
		</span>
	);
}

export const PDFDocumentContainer = connect(getRenderCritialData, {
	materialLoaded,
	captureMaterialData,
})(PDFDocument);

const mouseUpDocument = () => {
	return (dispatch: any, getState: Function) => {
		const selectionData = selection.services.getSelection();

		if (selectionData) {
			const selectedStr = selectionData.text;
			const selectionObject = selectionData.selection;

			const state = getState();
			const goalCard = cards.selectors.getGoalCard(state);

			if (goalCard) {
				// this is the dispatch for the grab for field button
				//(which has been pressed before the mouse-up if goalCard is not null), here we actually update the goal card

				//TODO-NICE: allow grabbing from other cards
				// for now we dont allow grabbing from other cards to simplifiy the card->card workflow

				dispatch(
					cards.actions.updateCardContent(
						selectedStr,
						goalCard.cardID,
						goalCard.creationType,
						"REPLACE",
						goalCard.origin
					)
				);

				dispatch(cards.actions.resetGoalCard());
			} else {
				dispatch(selection.actions.selectedParent(selectionObject.anchorNode?.parentNode as HTMLSpanElement));
				dispatch(selection.actions.updateManuallySelectedString(selectedStr));
			}
		}
	};
};
