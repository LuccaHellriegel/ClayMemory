import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WorkbenchSlot } from "./WorkbenchSlot";

function mapStateToProps(state: any) {
	return { workbenchGrid: state.workbenchGrid };
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {};
}

export const WorkbenchSlotContainer = connect(mapStateToProps, mapDispatchToProps)(WorkbenchSlot);
