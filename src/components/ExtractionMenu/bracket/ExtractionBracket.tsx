import { selectionTextData } from "../../../services/SelectionService/SelectionService";
import React from "react";
import { connect } from "react-redux";
import { clickBracket } from "./ExtractionBracketActionsReducers";

function ExtractionBracket({ children, click }: any) {
	const handleClick = (event: any) => {
		event.preventDefault();

		const selection: any = window.getSelection();

		const data = selectionTextData(selection);

		console.log(data?.word);
		console.log(data?.sentence);
		console.log(
			data?.spans
				?.map((span) => span.innerHTML)
				.reduce((prev, cur) => {
					if (prev !== "") return prev + "\n" + cur;
					return prev + cur;
				}, "")
		);

		// need to capture all the text/nodes before the menu is opened because of the invisible div
		click({
			mouseX: event.clientX,
			mouseY: event.clientY,
			selection: null,
		});
	};

	return (
		<div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
			{children}
		</div>
	);
}

export const ExtractionBracketContainer = connect(() => {}, { click: clickBracket })(ExtractionBracket);
