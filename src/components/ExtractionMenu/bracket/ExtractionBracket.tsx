import { selectionTextData } from "../../../services/SelectionService/SelectionService";
import React from "react";

export function ExtractionBracket({ children, click }: any) {
	const handleClick = (event: any) => {
		event.preventDefault();

		const selection: any = window.getSelection();

		const data = selectionTextData(selection);

		//console.log("click");
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

		//TODO: how about w s a as selecting the text? + arrows, double click to immediately select word and
		//TODO alternative navigation by just arrows (the open editor in the slot is automatically chosen)
		// need to capture all the text/nodes before the menu is opened because of the invisible
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
