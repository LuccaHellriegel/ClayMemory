import "cypress-file-upload";

//TODO: make them really chainable, I suspect it is not actually chained even if I return it
// (e.g. getTextLayer does not seem to work, spans are collected from the whole page)
//TODO: I am sure the spec files could be cleaner, but for now they work

Cypress.Commands.add("visitGitHubPage", () => {
	return cy.visit("https://luccahellriegel.github.io/ClayMemory").clearLocalStorage().reload();
});

Cypress.Commands.add("getOptionsMenu", () => {
	// Options Menu
	return cy.get(":nth-child(3) > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root");
});

Cypress.Commands.add("uploadPDFtoApp", (fileName) => {
	return cy
		.getOptionsMenu()
		.click()
		.fixture(fileName)
		.then((fileContent) => {
			// Load Document Button
			cy.get(":nth-child(4) > .MuiButtonBase-root").get('input[type="file"]').attachFile(
				{
					fileContent: fileContent,
					fileName: fileName,
					mimeType: "application/pdf",
				},
				{ force: true }
			);
		});
});

Cypress.Commands.add("uploadPDFtoAppSecondTime", (fileName) => {
	return cy
		.getOptionsMenu()
		.click()
		.fixture(fileName)
		.then((fileContent) => {
			// Load Document Button
			cy.get(":nth-child(4) > .MuiButtonBase-root > .MuiButton-label").get('input[type="file"]').attachFile(
				{
					fileContent: fileContent,
					fileName: fileName,
					mimeType: "application/pdf",
				},
				{ force: true }
			);
		});
});

Cypress.Commands.add("getTextLayers", () => {
	return cy.get(".react-pdf__Page__textContent");
});

Cypress.Commands.add("pageContainsText", (text) => {
	return cy.get("span").contains(text);
});

Cypress.Commands.add("setTextAsSelection", (text) => {
	return cy.pageContainsText(text).setSelection(text);
});

Cypress.Commands.add("dismissSelection", () => {
	return cy
		.get(".MuiSnackbarContent-action > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path")
		.click();
});

Cypress.Commands.add("getPageInput", () => {
	return cy.get('[style="width: 37%;"] > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input');
});

Cypress.Commands.add("setPage", (page) => {
	return cy.getPageInput().type("{backspace}" + page + "{enter}");
});

Cypress.Commands.add("checkPage", (page) => {
	return cy
		.getPageInput()
		.invoke("val")
		.then((val) => {
			expect(val).equal(page.toString());
		});
});

Cypress.Commands.add("emptyNote", () => {
	return cy
		.get(
			'[style="position: absolute; left: 0px; top: 0px; height: 1018.35px; width: 100%;"] > :nth-child(1) > .MuiGrid-align-items-xs-flex-start > :nth-child(1) > [style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiIconButton-label > .MuiSvgIcon-root'
		)
		.click();
});

Cypress.Commands.add("emptyQA", () => {
	return cy
		.get(
			'[style="position: absolute; left: 0px; top: 0px; height: 1018.35px; width: 100%;"] > :nth-child(1) > .MuiGrid-align-items-xs-flex-start > :nth-child(1) > [style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root > path'
		)
		.click();
});

Cypress.Commands.add("removeInitialCardRiver1Cards", () => {
	return cy
		.get(
			'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path'
		)
		.click()
		.get(
			'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
		)
		.click()
		.get(
			'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
		)
		.click();
});

Cypress.Commands.add("openContextMenu", () => {
	return cy
		.get(
			'[style="position: absolute; left: 0px; top: 0px; height: 1018.35px; width: 100%;"] > :nth-child(1) > .MuiGrid-align-items-xs-flex-start > :nth-child(1) > [style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiIconButton-label > .MuiSvgIcon-root'
		)
		.rightclick();
});

Cypress.Commands.add("noteFromContextMenu", () => {
	return cy
		.get(
			'[style="position: fixed; z-index: 1300; right: 0px; bottom: 0px; top: 0px; left: 0px;"] > .MuiPaper-root > .MuiList-root > [tabindex="0"]'
		)
		.click();
});

Cypress.Commands.add("qFromContextMenu", () => {
	return cy
		.get(
			'[style="position: fixed; z-index: 1300; right: 0px; bottom: 0px; top: 0px; left: 0px;"] > .MuiPaper-root > .MuiList-root > :nth-child(3)'
		)
		.click();
});

Cypress.Commands.add("aFromContextMenu", () => {
	return cy
		.get(
			'[style="position: fixed; z-index: 1300; right: 0px; bottom: 0px; top: 0px; left: 0px;"] > .MuiPaper-root > .MuiList-root > :nth-child(4)'
		)
		.click();
});

// https://github.com/netlify/netlify-cms/blob/a4b7481a99f58b9abe85ab5712d27593cde20096/cypress/support/commands.js#L180

Cypress.Commands.add("selection", { prevSubject: true }, (subject, fn) => {
	cy.wrap(subject).trigger("mousedown").then(fn).trigger("mouseup");

	cy.document().trigger("selectionchange");
	return cy.wrap(subject);
});

function getTextNode(el, match) {
	const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
	if (!match) {
		return walk.nextNode();
	}

	let node;
	while ((node = walk.nextNode())) {
		if (node.wholeText.includes(match)) {
			return node;
		}
	}
}

function setBaseAndExtent(...args) {
	const document = args[0].ownerDocument;
	document.getSelection().removeAllRanges();
	document.getSelection().setBaseAndExtent(...args);
}

Cypress.Commands.add("setSelection", { prevSubject: true }, (subject, query, endQuery) => {
	return cy.wrap(subject).selection(($el) => {
		if (typeof query === "string") {
			const anchorNode = getTextNode($el[0], query);
			const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
			const anchorOffset = anchorNode.wholeText.indexOf(query);
			const focusOffset = endQuery
				? focusNode.wholeText.indexOf(endQuery) + endQuery.length
				: anchorOffset + query.length;
			setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
		} else if (typeof query === "object") {
			const el = $el[0];
			const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
			const anchorOffset = query.anchorOffset || 0;
			const focusNode = query.focusQuery ? getTextNode(el.querySelector(query.focusQuery)) : anchorNode;
			const focusOffset = query.focusOffset || 0;
			setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
		}
	});
});
