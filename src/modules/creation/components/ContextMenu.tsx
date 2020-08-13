import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { MenuItem, Divider } from "@material-ui/core";
import { useDispatch, connect } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { grabSelectionForContextMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType } from "../../cards/model";
import { CardConfigItem } from "./CardConfigItem";

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

function ContextMenu({
	position,
	state,
	menuRef,
	qaRefs,
	riverCards,
}: {
	position: { x: number; y: number };
	state: boolean;
	menuRef: RefObject<any>;
	qaRefs: RefObject<any>[];
	riverCards: CardConfig[];
}) {
	const dispatch = useDispatch();
	const openState = state;
	const dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string) => {
		dispatch(grabSelectionForContextMenu(type, creationType, cardID));
	};

	const increment = incrementer();
	const qaRefIndex = incrementer();

	const anchorPosition = openState ? { top: position.y, left: position.x } : undefined;

	// TODO-NICE: need to check for state before rendering MenuItems,
	// otherwise it shows up for a split-second when switching the menu off after adding to the river
	// weird Race Condition even if I dispatch closeContextMenu first?
	return (
		<Menu
			ref={openState ? menuRef : null}
			keepMounted
			open={openState}
			anchorReference="anchorPosition"
			anchorPosition={anchorPosition}
		>
			{openState &&
				riverCards.map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						dispatchRiver={dispatchRiver}
						key={increment()}
						qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
					></CardConfigItem>
				))}
			{openState && riverCards.length > 0 && <Divider />}

			{openState && [
				<NewQACard
					onClick={() => {
						dispatchRiver("Q-A", "Q");
					}}
				></NewQACard>,
				<NewNoteCard
					onClick={() => {
						dispatchRiver("Note", "NOTE");
					}}
				></NewNoteCard>,
			]}
		</Menu>
	);
}

export const ContextMenuContainer = connect(getContextMenuInitData)(ContextMenu);
