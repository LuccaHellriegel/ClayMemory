describe("main functionality: jump to origin", () => {
	it("jump from same page (a)", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.aFromContextMenu()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path'
			)
			.click();

		cy.checkPage(1);
		cy.get(".react-pdf__Page__textContent").eq(0).get("span").eq(0).get("mark").eq(0).contains("A Simple PDF");
	});
	it("jump from same page (q)", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.qFromContextMenu()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click();

		cy.checkPage(1);
		cy.get(".react-pdf__Page__textContent").eq(0).get("span").eq(0).get("mark").eq(0).contains("A Simple PDF");
	});
	it("jump from River Explorer", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.aFromContextMenu()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.setPage(2)
			.get(":nth-child(2) > .MuiTab-wrapper")
			.click()
			.get(
				'[style="margin-bottom: 8px; margin-top: 4px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(3) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click();

		cy.checkPage(1);
		cy.get(".react-pdf__Page__textContent").eq(0).get("span").eq(0).get("mark").eq(0).contains("A Simple PDF");
	});
});

//TODO: setSelection does not work correctly with the TextArea
// describe("main functionality: copy origin from card", () => {
// 	it("copy origin from a to another cards q", () => {
// 		cy.visitGitHubPage()
// 			.uploadPDFtoApp("sample.pdf")
// 			.getTextLayers()
// 			.setTextAsSelection("A Simple PDF")
// 			.openContextMenu()
// 			.noteFromContextMenu()
// 			.emptyQA()
//
// 			.reload()
// 			.uploadPDFtoAppSecondTime("sample.pdf")
// 			.get(
// 				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
// 			)
// 			.contains("A Simple PDF")
// 			.setSelection();

// 	});
// });
