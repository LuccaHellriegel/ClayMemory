import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

export const MOUSE = "MOUSE";

function findParagraphSpans(s: Selection) {
	//TODO: test if valid text-selection

	//TODO: should be text-Node
	const textNode: any = s.anchorNode;

	//TODO: should be span-Node
	const spanNode: any = textNode.parentNode;

	if (spanNode.nodeName !== "SPAN") return [];

	//TODO: assumes all spans in paragraph have the same height, might need recursion or collecting all different heights?
	const rect = spanNode.getBoundingClientRect();
	const spanHeight = rect.bottom - rect.y;

	const spans = [spanNode];

	let add = spanHeight * 1.5;
	let remove = spanHeight / 2;

	let tempSpanNode = null;

	let expand = true;
	let spansLength = spans.length;
	while (expand) {
		//TODO: optimization of temp selection
		tempSpanNode = document.elementFromPoint(rect.x, rect.y - remove);
		if (tempSpanNode?.nodeName === "SPAN") {
			spans.unshift(tempSpanNode);
			remove += spanHeight;
		} else {
			console.log(tempSpanNode);
		}

		tempSpanNode = document.elementFromPoint(rect.x, rect.y + add);
		if (tempSpanNode?.nodeName === "SPAN") {
			spans.push(tempSpanNode);
			add += spanHeight;
		} else {
			console.log(tempSpanNode);
		}

		if (spansLength === spans.length) {
			expand = false;
		} else {
			spansLength = spans.length;
		}
		//console.log(spans);
	}

	return spans;
}

function setEndofWord(node: any, range: Range) {
	//move end to right until " " is reached

	//TODO: includes . in word
	try {
		do {
			range.setEnd(node, range.endOffset + 1);
		} while (range.toString().indexOf(" ") === -1 && range.toString().trim() !== "" && range.endOffset < node.length);
		return true;
	} catch (e) {
		//console.log(e);
		return false;
	}
}

function setEndofSentence(node: any, range: Range) {
	//TODO: handle line-breaks
	try {
		do {
			range.setEnd(node, range.endOffset + 1);
		} while (range.toString().indexOf(".") === -1 && range.toString().trim() !== "" && range.endOffset < node.length);
		return true;
	} catch (e) {
		//console.log(e);
		return false;
	}
}

function setEndOfParagraph(node: any, range: Range) {
	//TODO: handle line-breaks
	try {
		do {
			range.setEnd(node, range.endOffset + 1);
		} while (range.toString().indexOf(".") === -1 && range.toString().trim() !== "" && range.endOffset < node.length);
		return true;
	} catch (e) {
		//console.log(e);
		return false;
	}
}

function paragraph(s: Selection) {
	return () => {
		// text is rendered as non-nested spans, that are in one big div, which is the page

		const range: Range = s.getRangeAt(0);
		const node: any = s.anchorNode;

		const str = node.parentNode.innerHTML.trim();

		// //console.log(node.parentNode);
		// //console.log(node.parentNode.nodeName);
		// //console.log(node.parentNode.parentNode);
		// //console.log(node.parentNode.parentNode.nodeName);
		const rect = node.parentNode.getBoundingClientRect();
		const height = rect.bottom - rect.y;
		// //console.log("sniped element: ", document.elementFromPoint(rect.x, rect.y - height));

		//console.log(str);

		return str;
	};
}

function sentence(s: Selection) {
	return () => {
		const range: Range = s.getRangeAt(0);
		const node: any = s.anchorNode;

		if (!node) return "";

		//move start to left until " " is reached
		const emptySpaceNotReached = () => range.toString().indexOf(" ") !== 0;
		const leftEndNotReached = () => range.startOffset > 0;
		while (emptySpaceNotReached() && leftEndNotReached()) {
			range.setStart(node, range.startOffset - 1);
		}
		if (leftEndNotReached()) {
			// this means, empty space was reached and we need to move one to the right
			range.setStart(node, range.startOffset + 1);
		}

		setEndofSentence(node, range);
		const str = range.toString().trim();

		//console.log(str);

		return str;
	};
}

function word(s: Selection) {
	return () => {
		const range: Range = s.getRangeAt(0);
		const node: any = s.anchorNode;

		if (!node) return "";

		//move start to left until " " is reached
		const emptySpaceNotReached = () => range.toString().indexOf(" ") !== 0;
		const leftEndNotReached = () => range.startOffset > 0;
		while (emptySpaceNotReached() && leftEndNotReached()) {
			range.setStart(node, range.startOffset - 1);
		}
		if (leftEndNotReached()) {
			// this means, empty space was reached and we need to move one to the right
			range.setStart(node, range.startOffset + 1);
		}

		setEndofWord(node, range);
		const str = range.toString().trim();

		//console.log(str);

		return str;
	};
}

function ExtractionMenu({ mouseX, mouseY, close, selection }: any) {
	//console.log("Rendering ExtractionMenu");
	//TODO: context menu only for editor content not anywhere?
	// yes, because otherwise user can try to extract non-text

	// it is necessary to close on right-click, because menu renders invisible diff that makes selection impossible
	// Source: https://stackoverflow.com/questions/61456322/how-do-you-close-the-material-ui-context-menu-without-displaying-the-default-co
	//console.log(selection);
	return (
		<div
			onContextMenu={(event) => {
				event.preventDefault();
				close();
			}}
		>
			<Menu
				keepMounted
				open={mouseY !== null}
				onClose={close}
				anchorReference="anchorPosition"
				anchorPosition={mouseY !== null && mouseX !== null ? { top: mouseY, left: mouseX } : undefined}
			>
				<MenuItem onClick={word(selection)}>Word</MenuItem>
				<MenuItem onClick={sentence(selection)}>Sentence</MenuItem>
				<MenuItem onClick={paragraph(selection)}>Paragraph</MenuItem>
			</Menu>
		</div>
	);
}

function mapStateToPropsMenu({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection };
}

function mapDispatchToPropsMenu(dispatch: any) {
	return {
		close: () => {
			dispatch(click({ mouseX: null, mouseY: null, selection: null }));
		},
	};
}

export const ExtractionMenuContainer = connect(mapStateToPropsMenu, mapDispatchToPropsMenu)(ExtractionMenu);

function click({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection, type: MOUSE };
}

function ExtractionMenuBracket({ children, click }: any) {
	const handleClick = (event: any) => {
		event.preventDefault();

		const selection: any = window.getSelection();

		//console.log("click");
		console.log(
			findParagraphSpans(selection)
				.map((span) => span.innerHTML)
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
			selection: { word: word(selection)(), sentence: sentence(selection)(), paragraph: paragraph(selection)() },
		});
	};

	return (
		<div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
			{children}
		</div>
	);
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: any) {
	return {
		click: ({ mouseX, mouseY, selection }: any) => {
			dispatch(click({ mouseX, mouseY, selection }));
		},
	};
}

export const ExtractionMenuBracketContainer = connect(mapStateToProps, mapDispatchToProps)(ExtractionMenuBracket);
