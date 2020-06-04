import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

export const MOUSE = "MOUSE";

function word(s: any) {
	return () => {
		var range: any = s.getRangeAt(0);
		var node: any = s.anchorNode;
		while (range.toString().indexOf(" ") != 0) {
			range.setStart(node, range.startOffset - 1);
		}
		range.setStart(node, range.startOffset + 1);
		do {
			range.setEnd(node, range.endOffset + 1);
		} while (range.toString().indexOf(" ") == -1 && range.toString().trim() != "" && range.endOffset < node.length);
		var str = range.toString().trim();

		console.log(str);

		return str;
	};
}

function ExtractionMenu({ mouseX, mouseY, close, selection }: any) {
	console.log("Rendering ExtractionMenu");
	//TODO: context menu only for editor content not anywhere?

	// it is necessary to close on right-click, because menu renders invisible diff that makes selection impossible
	// Source: https://stackoverflow.com/questions/61456322/how-do-you-close-the-material-ui-context-menu-without-displaying-the-default-co
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
				<MenuItem onClick={word(selection)}>Sentence</MenuItem>
				<MenuItem onClick={word(selection)}>Paragraph</MenuItem>
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

		click({ mouseX: event.clientX, mouseY: event.clientY, selection: window.getSelection() });
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
