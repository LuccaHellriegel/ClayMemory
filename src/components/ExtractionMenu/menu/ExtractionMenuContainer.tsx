import { connect } from "react-redux";
import { EXTRACTION_MENU_LEFTCLICK } from "./ExtractionMenuActions";
import { ExtractionMenu } from "./ExtractionMenu";

function clickMenu({ mouseX, mouseY, selection }: any) {
	return { mouseX, mouseY, selection, type: EXTRACTION_MENU_LEFTCLICK };
}

function mapStateToProps({ mouseX, mouseY, workbenchGrid }: any) {
	return { mouseX, mouseY, workbenchGrid };
}

function mapDispatchToProps(dispatch: any) {
	return {
		close: () => {
			dispatch(clickMenu({ mouseX: null, mouseY: null, selection: null }));
		},
	};
}

export const ExtractionMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ExtractionMenu);
