import React from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { getContextMenuFillData } from "../selectors";
import analyze from "../../../material/analyze";

// Reminder: need to capture all the text/nodes before the menu is opened because of the invisible div
// it is necessary to close on right-click, because menu renders invisible diff that makes selection impossible
// Source: https://stackoverflow.com/questions/61456322/how-do-you-close-the-material-ui-context-menu-without-displaying-the-default-co

//TODO: maybe pre-calculate on changing layout?

// TODO: use existing/open cards as possible targets

function ContextMenu({ boundingRectGroup, state }: { boundingRectGroup?: DOMRect[]; state?: boolean }) {
	return boundingRectGroup && state !== undefined ? (
		<Menu
			keepMounted
			open={state}
			anchorReference="anchorPosition"
			anchorPosition={state ? { top: boundingRectGroup[0].y, left: boundingRectGroup[0].x } : undefined}
		>
			<NestedMenuItem label="Q-A" parentMenuOpen={state}>
				<MenuItem>Q</MenuItem>
				<MenuItem>A</MenuItem>
			</NestedMenuItem>
			<NestedMenuItem label="Cloze" parentMenuOpen={state}></NestedMenuItem>
			<NestedMenuItem label="Note" parentMenuOpen={state}></NestedMenuItem>
			<Divider />
			<MenuItem>New: Q-A</MenuItem>
			<MenuItem>New: Cloze</MenuItem>
			<MenuItem>New: Note</MenuItem>

			<MenuItem></MenuItem>
		</Menu>
	) : null;
}

//MuiList-root MuiMenu-list MuiList-padding

export const ContextMenuContainer = connect(analyze.utils.createDataConditionalSelector(getContextMenuFillData))(
	ContextMenu
);
