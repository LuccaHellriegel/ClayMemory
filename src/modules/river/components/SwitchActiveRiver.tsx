import { useDispatch } from "react-redux";
import { trySetActiveRiver } from "../actions";
import { ReactNode } from "react";
import React from "react";

export const SwitchActiveRiver = ({ children, riverID }: { children: ReactNode; riverID: string }) => {
	const dispatch = useDispatch();

	return (
		<span
			onMouseEnter={() => {
				dispatch(trySetActiveRiver(riverID));
			}}
		>
			{children}
		</span>
	);
};
