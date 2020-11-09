// test-utils.js
import React, { ReactElement, ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { applyClayMemoryMiddleware, rootReducer } from "../store";

const store = createStore(rootReducer, applyClayMemoryMiddleware());

const wrapper = ({ children }: { children?: ReactNode }) => {
	return <Provider store={store}>{children}</Provider>;
};

const render = (ui: ReactElement) => {
	return rtlRender(ui, { wrapper });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
