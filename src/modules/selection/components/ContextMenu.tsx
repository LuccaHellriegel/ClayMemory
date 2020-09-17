import React, { Fragment, RefObject, useCallback, useEffect, useRef, useState } from "react";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Divider, MenuItem } from "@material-ui/core";
import { addSelectionGoal } from "../actions";
import { sourceConfigExists } from "../selectors";

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

	//TODO-RC: check if I need the state check now

	const dispatch = useDispatch();

	return (
		<Menu ref={ref} keepMounted open={openState} anchorReference="anchorPosition" anchorPosition={menuPosition}>
			{openState && (
				<Fragment>
					<MenuItem
						onClick={() => {
							dispatch(addSelectionGoal({ cardField: "note", updateType: "REPLACE" }));
							setMenuPosition(undefined);
						}}
					>
						New: Note
					</MenuItem>

					<Divider></Divider>
					<MenuItem
						onClick={() => {
							dispatch(addSelectionGoal({ cardField: "q", updateType: "REPLACE" }));
							setMenuPosition(undefined);
						}}
					>
						New: Q (Q-A)
					</MenuItem>
					<MenuItem
						onClick={() => {
							dispatch(addSelectionGoal({ cardField: "a", updateType: "REPLACE" }));
							setMenuPosition(undefined);
						}}
					>
						New: A (Q-A)
					</MenuItem>
				</Fragment>
			)}
		</Menu>
	);
};

//TODO-NICE: delete extracted str in source
