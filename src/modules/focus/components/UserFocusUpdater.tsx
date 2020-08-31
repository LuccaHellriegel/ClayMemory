import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { UserFocus } from "../model";
import { tryUpdateFocus } from "../actions";

export const RiverControlFocusUpdater = ({ children }: { children: ReactNode }) => {
	return <UserFocusUpdater userFocus={"RIVER_CONTROL"}>{children}</UserFocusUpdater>;
};

const UserFocusUpdater = ({ userFocus, children }: { userFocus: UserFocus; children: ReactNode }) => {
	const dispatch = useDispatch();
	return (
		<span
			onMouseEnter={() => {
				dispatch(tryUpdateFocus(userFocus));
			}}
		>
			{children}
		</span>
	);
};
