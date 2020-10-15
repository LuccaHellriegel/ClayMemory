describe("main functionality: add to empty card", () => {
	it("add selection to empty note", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyNote()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.invoke("val")
			.then((val) => {
				expect(val).equal("A Simple PDF");
			});
	});
	it("add selection to empty qa: q", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyQA()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
	it("add selection to empty qa: a", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyQA()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(1) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
});

describe("main functionality: replace empty card field", () => {
	it("replace empty note", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyNote()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.invoke("val")
			.then((val) => {
				expect(val).equal("A Simple PDF");
			});
	});
	it("replace empty qa: q", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyQA()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
	it("replace empty qa: a", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.reload()
			.uploadPDFtoAppSecondTime("sample.pdf")
			.emptyQA()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(2) > .MuiPaper-root > .MuiGrid-container > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root'
			)
			.click()
			.get(
				'[style="max-width: 420px;"] > .MuiAccordion-root > .MuiCollapse-container > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > [role="region"] > .MuiAccordionDetails-root > :nth-child(1) > :nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(1) > .MuiCard-root > .MuiGrid-justify-xs-space-between > :nth-child(1) > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(1) > span > .MuiFormControl-root > .MuiInputBase-root > [rows="1"]'
			)
			.contains("A Simple PDF");
	});
});
