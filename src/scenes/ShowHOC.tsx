import React, { FunctionComponent } from "react";

export const ShowHOC = (Component: FunctionComponent<any>) => {
	return ({ show, ...props }: { show: boolean }) => {
		return show ? <Component {...props}></Component> : null;
	};
};
