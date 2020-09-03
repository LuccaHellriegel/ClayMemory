import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { Divider, MenuItem } from "@material-ui/core";
import { useDispatch, connect, useSelector, useStore } from "react-redux";
import { getContextMenuInitData, getContextMenuFullCardsRef } from "../selectors";
import { closeContextMenu, openContextMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType } from "../../cards/model/model";
import { QACardContent } from "../../cards/model/model-content";
import { CardConfigItem, noteCardIsEmpty, qaCardIsNotFull } from "./CardItems";
import { NewButtons } from "./NewButtons";
import NestedMenuItem from "material-ui-nested-menu-item";
import selection from "../../selection";
import { CardOrigin } from "../../cards/model/model-origin";
import display from "../../display";
import { SourceCard } from "../../selection/model";
import river from "../../river";
import focus from "../../focus";
import { useEventListener } from "../../../shared/useEventListener";
import { contextMenuContainsTargetNode } from "../services";

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

	useEventListener("mousedown", (event: MouseEvent) => {
		dispatch(mouseDownControl(event));
	});

	useEventListener("contextmenu", (event: MouseEvent) => {
		dispatch(rightClickControl(event));
	});

	const fullCardsRef = useSelector(getContextMenuFullCardsRef);

	const sourceCard = useSelector(selection.selectors.getSourceCard);

	//TODO-NICE: open menu in editor to the right not over the document

	const openState = state;

	const selectedParent = useSelector(selection.selectors.getCurrentSelectedParent);
	const store = useStore();

	const dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string) => {
		dispatch(closeContextMenu());

		if (sourceCard) {
			dispatch(
				selection.actions.selectionToCardForSourceCard(
					type,
					creationType,
					(sourceCard as SourceCard).sourceField,
					(sourceCard as SourceCard).origin,
					cardID
				)
			);
			dispatch(selection.actions.resetSourceCard());
		} else {
			// always overwrite origin, even if isUpdate, because updateType==replace
			const origin: CardOrigin | undefined = selectedParent
				? display.selectors.getCurrentOrigin(store.getState())
				: undefined;

			dispatch(selection.actions.selectionToCard(type, creationType, origin, cardID));
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

const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const clickOutSideOfMenu = !contextMenuContainsTargetNode(getState(), event);
		if (clickOutSideOfMenu) {
			dispatch(closeContextMenu());
			dispatch(river.actions.resetHoveredCard());
		}
	};
};

//TODO-NICE: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-NICE: delete extracted str in source

const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();

		if (!selection.selectors.currentSelectionExists(state)) return;
		event.preventDefault();

		const displayFocus = focus.selectors.getDisplayFocus(state);

		dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
		dispatch(openContextMenu());

		if (displayFocus === "ACTIVE_RIVER") {
			//if the user is focused on the document, the push-to river should always be the active=page-wise river
			dispatch(river.actions.setPushToRiver(river.selectors.getActiveRiverMakeUpID(state)));
		}
	};
};

export const ContextMenuContainer = connect(getContextMenuInitData)(ContextMenu);
