import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { Divider, MenuItem } from "@material-ui/core";
import { useDispatch, connect, useSelector } from "react-redux";
import { getContextMenuInitData, getContextMenuFullCardsRef } from "../selectors";
import { grabSelectionForContextMenu, grabSelectionForSourceMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType } from "../../cards/model/model";
import { QACardContent } from "../../cards/model/model-content";
import { CardConfigItem, noteCardIsEmpty, qaCardIsNotFull } from "./CardItems";
import { NewButtons } from "./NewButtons";
import NestedMenuItem from "material-ui-nested-menu-item";
import river from "../../river";
import { SourceCard } from "../../river/model";

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
	const fullCardsRef = useSelector(getContextMenuFullCardsRef);

	const dispatch = useDispatch();
	const sourceCard = useSelector(river.selectors.getSourceCard);

	//TODO-NICE: open menu in editor to the right not over the document

	const openState = state;
	const dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string) => {
		if (sourceCard) {
			dispatch(
				grabSelectionForSourceMenu(
					type,
					creationType,
					(sourceCard as SourceCard).sourceField,
					(sourceCard as SourceCard).origin,
					cardID
				)
			);
		} else {
			dispatch(grabSelectionForContextMenu(type, creationType, cardID));
		}
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

	// TODO-NICE: use hidden MenuItem-pattern also for qa-ref

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
					noteDispatch={() => {
						dispatchRiver("Note", "note");
					}}
					qDispatch={() => {
						dispatchRiver("Q-A", "q");
					}}
					aDispatch={() => {
						dispatchRiver("Q-A", "a");
					}}
				></NewButtons>
			)}

			{openState && fullRiverCards.length > 0 && <Divider />}
			{openState && fullRiverCards.length > 0 && (
				<NestedMenuItem label="Full cards: " parentMenuOpen={true}>
					<MenuItem ref={fullCardsRef} style={{ position: "absolute" }}></MenuItem>
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
