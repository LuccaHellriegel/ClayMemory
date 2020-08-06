import React, { FunctionComponent } from "react";

export const ShowHOC = (InputComponent: FunctionComponent<any>) => {
	return ({ show, ...props }: { show: boolean }) => {
		return show ? <InputComponent {...props}></InputComponent> : null;
	};
};
