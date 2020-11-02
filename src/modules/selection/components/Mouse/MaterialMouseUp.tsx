import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addMaterialSelectionSource } from "../../actions";

// should only be used once material/pdf exists
export const MaterialMouseUp = ({ children, page }: { children: ReactNode; page: number }) => {
	const dispatch = useDispatch();

	return (
		<span
			onMouseUp={() => {
				const materialSelectionSourceAction = addMaterialSelectionSource(page);
				if (materialSelectionSourceAction) dispatch(materialSelectionSourceAction);
			}}
			onMouseDown={(event: React.MouseEvent<any>) => {
				// without this it is possible so have something selected
				// close the selection-snackbar
				// it stays selected (only on click inside text it woud de-select)
				// then press the mouse and
				// the selection-snackbar pops back up
				// even though it is not a new selection just the old one
				if (event.button === 0) window.getSelection()?.empty();
			}}
		>
			{children}
		</span>
	);
};
