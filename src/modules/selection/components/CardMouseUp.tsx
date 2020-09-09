import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addCardSelectionSource } from "../actions";
import { SingleOrigin } from "../../cards/model/model-origin";

export const CardFieldMouseUp = ({ children, fieldOrigin }: { children: ReactNode; fieldOrigin?: SingleOrigin }) => {
	const dispatch = useDispatch();

	return (
		<span
			onMouseUp={() => {
				const cardSelectionSourceAction = addCardSelectionSource(fieldOrigin);
				if (cardSelectionSourceAction) dispatch(cardSelectionSourceAction);
			}}
		>
			{children}
		</span>
	);
};
