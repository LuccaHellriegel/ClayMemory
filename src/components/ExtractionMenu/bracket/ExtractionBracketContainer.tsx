import { connect } from "react-redux";
import { ExtractionBracket } from "./ExtractionBracket";
import { EXTRACTION_BRACKET_RIGHTCLICK } from "./ExtractionBracketActions";

function clickBracket({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection, type: EXTRACTION_BRACKET_RIGHTCLICK };
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: any) {
	return {
		click: ({ mouseX, mouseY, selection }: any) => {
			dispatch(clickBracket({ mouseX, mouseY, selection }));
		},
	};
}

export const ExtractionBracketContainer = connect(mapStateToProps, mapDispatchToProps)(ExtractionBracket);
