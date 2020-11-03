import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Divider, MenuItem } from "@material-ui/core";
import { addSelectionTarget } from "../../actions";
import { sourceConfigExists } from "../../selectors";

// TODO: be able to directly fill empty field of newly created card
// (only one, so that it does not take up so much space?)
// e.g. created Q from selection and then want to do A -> need to do it with buttons now

// TODO: be able to completly fill card in contextmenu (have card in contextmenu), then send with ok

// TODO: be able to create empty card from context-menu, maybe if no selection, then it is an empty card?

// the root div for the menu invisibly covers the whole screen
// the actual div that is visible is this
const baseContextMenuSelector = "div.MuiPaper-root";
const contextMenuContainsTargetNode = (ref: RefObject<null | HTMLDivElement>, event: MouseEvent) => {
	const target = event.target as Node;
	if (ref.current?.querySelector(baseContextMenuSelector)?.contains(target)) return true;
	return false;
};

export const ContextMenu = () => {
	const [menuPosition, setMenuPosition] = useState<undefined | { top: number; left: number }>(undefined);
	const ref = useRef(null);

	const shouldClose = useCallback(
		(event: MouseEvent) => {
			const clickOutSideOfMenu = !contextMenuContainsTargetNode(ref, event);
			if (clickOutSideOfMenu) {
				setMenuPosition(undefined);
			}
		},
		[ref, setMenuPosition]
	);
	useEffect(() => {
		document.addEventListener("mousedown", shouldClose);
		return () => {
			document.removeEventListener("mousedown", shouldClose);
		};
	}, [shouldClose]);

	const doesSourceConfigExists = useSelector(sourceConfigExists);
	const shouldOpen = useCallback(
		(event: MouseEvent) => {
			if (!doesSourceConfigExists) return;

			event.preventDefault();

			setMenuPosition({ left: event.x, top: event.y });
		},
		[doesSourceConfigExists, setMenuPosition]
	);
	useEffect(() => {
		document.addEventListener("contextmenu", shouldOpen);
		return () => {
			document.removeEventListener("contextmenu", shouldOpen);
		};
	}, [shouldOpen]);

	const openState = !!menuPosition;

	const dispatch = useDispatch();

	return (
		<Menu ref={ref} keepMounted open={openState} anchorReference="anchorPosition" anchorPosition={menuPosition}>
			<MenuItem
				onClick={() => {
					dispatch(addSelectionTarget({ cardField: "note", updateType: "REPLACE" }));
					setMenuPosition(undefined);
				}}
			>
				New: Note
			</MenuItem>

			<Divider></Divider>
			<MenuItem
				onClick={() => {
					dispatch(addSelectionTarget({ cardField: "q", updateType: "REPLACE" }));
					setMenuPosition(undefined);
				}}
			>
				New: Q (Q-A)
			</MenuItem>
			<MenuItem
				onClick={() => {
					dispatch(addSelectionTarget({ cardField: "a", updateType: "REPLACE" }));
					setMenuPosition(undefined);
				}}
			>
				New: A (Q-A)
			</MenuItem>
		</Menu>
	);
};

//TODO: delete extracted str in source
