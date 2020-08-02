import { FunctionComponent } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { Dispatch } from "redux";
import { createDataConditionalSelector } from "../selectors";
import React from "react";

export const HasDataGuardHOC = (Component: FunctionComponent<any>) => {
	return ({ hasData, ...props }: { hasData: boolean }) => {
		return hasData ? <Component {...props}></Component> : null;
	};
};

export const DataGuardHOC = (
	Component: FunctionComponent<any>,
	propsSelector: (state: any) => any,
	dispatchSelector?: (dispatch: Dispatch) => any
): ConnectedComponent<(props: any) => JSX.Element | null, any> => {
	// renders null if data-selector returns {}
	return connect(createDataConditionalSelector(propsSelector), dispatchSelector)(HasDataGuardHOC(Component));
};
