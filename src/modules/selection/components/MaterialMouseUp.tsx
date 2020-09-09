import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addMaterialSelectionSource } from "../actions";

// should only be used once material/pdf exists
export const MaterialMouseUp = ({ children, page }: { children: ReactNode; page: number }) => {
	const dispatch = useDispatch();

	return (
		<span
			onMouseUp={() => {
				const materialSelectionSourceAction = addMaterialSelectionSource(page);
				if (materialSelectionSourceAction) dispatch(materialSelectionSourceAction);
			}}
		>
			{children}
		</span>
	);
};
