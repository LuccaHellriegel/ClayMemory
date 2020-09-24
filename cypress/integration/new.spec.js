describe("main functionality: new card from ContextMenu", () => {
	it("aFromContextMenu", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.aFromContextMenu()
			.removeInitialCardRiver1Cards()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
	it("qFromContextMenu", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.qFromContextMenu()
			.removeInitialCardRiver1Cards()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
	it("noteFromContextMenu", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.openContextMenu()
			.noteFromContextMenu()
			.removeInitialCardRiver1Cards()
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			// not the same Element as QA
			.invoke("val")
			.then((val) => {
				expect(val).equal("A Simple PDF");
			});
	});
});
