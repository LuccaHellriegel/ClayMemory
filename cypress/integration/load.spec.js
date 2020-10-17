describe("pdf loading and state restoring", () => {
	it("loading pdf with different name", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("A Simple PDF File")
			.uploadPDFtoApp("sample2.pdf")
			.setPage(2)
			.checkPage(2)
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("Simple PDF File 2");
	});
	it("empty notes are still there after uploading second pdf", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.emptyNote()
			.emptyNote()
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("A Simple PDF File")
			.uploadPDFtoApp("sample2.pdf")
			.wait(500)
			.uploadPDFWithExistingDatatoApp("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between'
			)
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(3) > .MuiCard-root > .MuiGrid-justify-xs-space-between'
			);
	});
	it("empty notes are still there after uploading second pdf and creating empty qas", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.emptyNote()
			.emptyNote()
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("A Simple PDF File")
			.uploadPDFtoApp("sample2.pdf")
			.wait(500)
			.emptyQA()
			.emptyQA()
			.uploadPDFWithExistingDatatoApp("sample.pdf")
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between'
			)
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(3) > .MuiCard-root > .MuiGrid-justify-xs-space-between'
			);
	});
	it("empty qas for second pdf are still there after uploading first pdf, second one, first and then second again", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.emptyNote()
			.emptyNote()
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("A Simple PDF File")
			.uploadPDFtoApp("sample2.pdf")
			.wait(500)
			.emptyQA()
			.emptyQA()
			.uploadPDFWithExistingDatatoApp("sample.pdf")
			.uploadPDFWithExistingDatatoApp("sample2.pdf")
			.wait(500)
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1)'
			)
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(3)'
			);
	});
});
