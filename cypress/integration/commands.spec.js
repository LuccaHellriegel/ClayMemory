describe("test ClayMemory-commands", () => {
	it("visitGitHubPage", () => {
		cy.visitGitHubPage();
	});
	it("getOptionsMenu", () => {
		cy.visitGitHubPage().getOptionsMenu();
	});
	it("uploadPDFtoApp", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf");
	});
	it("getTextLayers", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf").getTextLayers().eq(0);
	});
	it("setTextAsSelection", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf").getTextLayers().eq(0).setTextAsSelection("A Simple PDF");
	});
	it("dismissSelection", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.getTextLayers()
			.setTextAsSelection("A Simple PDF")
			.dismissSelection();
	});
	it("setPage", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf").setPage(2);
	});
	it("checkPage", () => {
		cy.visitGitHubPage()
			.uploadPDFtoApp("sample.pdf")
			.setPage(2)
			.checkPage(2)
			.getTextLayers()
			.eq(1)
			.get("span")
			.contains("Simple PDF File 2");
	});
	it("emptyNote", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf").emptyNote();
	});
	it("emptyQA", () => {
		cy.visitGitHubPage().uploadPDFtoApp("sample.pdf").emptyQA();
	});
});
