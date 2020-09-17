import React from "react";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getContextMenuPosition, getContextMenuRef } from "../selectors";
import { rightClickControl, mouseDownControl } from "../actions";
import { NewButtons } from "./NewButtons";
import { useEventListener } from "../../../shared/useEventListener";
import { Position } from "../model";

export const ContextMenu = () => {
	const position = useSelector(getContextMenuPosition);
	const menuRef = useSelector(getContextMenuRef);

	const dispatch = useDispatch();

	useEventListener("mousedown", (event: MouseEvent) => {
		dispatch(mouseDownControl(event));
	});

	useEventListener("contextmenu", (event: MouseEvent) => {
		dispatch(rightClickControl(event));
	});

	const openState = !!position;

	const anchorPosition = openState ? { top: (position as Position).y, left: (position as Position).x } : undefined;

	//TODO-RC: check if I need the state check now

	return (
		<Menu
			ref={openState ? menuRef : null}
			keepMounted
			open={openState}
			anchorReference="anchorPosition"
			anchorPosition={anchorPosition}
		>
			{openState && <NewButtons></NewButtons>}
		</Menu>
	);
};

//TODO-NICE: delete extracted str in source
