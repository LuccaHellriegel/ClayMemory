import { connect } from "react-redux";
import { WorkbenchGrid } from "./WorkbenchGrid";
import { Dispatch } from "redux";

function mapStateToProps(state: any) {
	return { workbenchGrid: state.workbenchGrid };
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {};
}

export const WorkbenchGridContainer = connect(mapStateToProps, mapDispatchToProps)(WorkbenchGrid);
