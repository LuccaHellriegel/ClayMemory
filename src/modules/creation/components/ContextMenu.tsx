import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { Divider } from "@material-ui/core";
import { useDispatch, connect } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { grabSelectionForContextMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType, QACardContent } from "../../cards/model";
import { CardConfigItem, noteCardIsEmpty, qaCardIsNotFull } from "./CardItems";
import { NewButtons } from "./NewButtons";
import NestedMenuItem from "material-ui-nested-menu-item";

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

	//TODO-PERF: use partition function, or loop to avoid double iteration
	//TODO-NICE: abstract menu, this is doubled
	const nonFullRiverCards = riverCards.filter((card) => {
		if (typeof card.content === "string") {
			return noteCardIsEmpty(card.content);
		} else {
			return qaCardIsNotFull(card.content as QACardContent);
		}
	});

	const fullRiverCards = riverCards.filter((card) => {
		if (typeof card.content === "string") {
			return !noteCardIsEmpty(card.content);
		} else {
			return !qaCardIsNotFull(card.content as QACardContent);
		}
	});

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
				nonFullRiverCards.map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						dispatchRiver={dispatchRiver}
						key={increment()}
						qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
					></CardConfigItem>
				))}
			{openState && nonFullRiverCards.length > 0 && <Divider />}

			{openState && (
				<NewButtons
					noteClick={() => {
						dispatchRiver("Note", "NOTE");
					}}
					qClick={() => {
						dispatchRiver("Q-A", "Q");
					}}
					aClick={() => {
						dispatchRiver("Q-A", "A");
					}}
				></NewButtons>
			)}

			{openState && fullRiverCards.length > 0 && <Divider />}
			{openState && (
				<NestedMenuItem label="Full cards: " parentMenuOpen={true}>
					{fullRiverCards.map((cardConfig) => (
						<CardConfigItem
							cardConfig={cardConfig}
							dispatchRiver={dispatchRiver}
							key={increment()}
							qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
						></CardConfigItem>
					))}
				</NestedMenuItem>
			)}
		</Menu>
	);
}

export const ContextMenuContainer = connect(getContextMenuInitData)(ContextMenu);
