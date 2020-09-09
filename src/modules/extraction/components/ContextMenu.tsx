import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { Divider, MenuItem } from "@material-ui/core";
import { useDispatch, connect, useSelector } from "react-redux";
import { getContextMenuInitData, getContextMenuFullCardsRef } from "../selectors";
import { rightClickControl, mouseDownControl } from "../actions";
import { incrementer, partition } from "../../../shared/utils";
import { CardConfig } from "../../cards/model/model-config";
import { CardConfigItem } from "./CardConfigItem";
import { NewButtons } from "./NewButtons";
import NestedMenuItem from "material-ui-nested-menu-item";
import { useEventListener } from "../../../shared/useEventListener";
import cards from "../../cards";
import { Position } from "../model";
import { getActiveRiverMakeUpID } from "../../river/selectors";

function ContextMenu({
	position,
	menuRef,
	qaRefs,
	riverCards,
}: {
	position: { x: number; y: number } | null;
	menuRef: RefObject<any>;
	qaRefs: RefObject<any>[];
	riverCards: CardConfig[];
}) {
	const dispatch = useDispatch();

	console.log(useSelector(getActiveRiverMakeUpID));

	useEventListener("mousedown", (event: MouseEvent) => {
		dispatch(mouseDownControl(event));
	});

	useEventListener("contextmenu", (event: MouseEvent) => {
		dispatch(rightClickControl(event));
	});

	const fullCardsRef = useSelector(getContextMenuFullCardsRef);

	const openState = !!position;

	const increment = incrementer();
	const qaRefIndex = incrementer();

	const anchorPosition = openState ? { top: (position as Position).y, left: (position as Position).x } : undefined;

	const [nonFullRiverCards, fullRiverCards] = partition(riverCards, cards.model.model_config.cardIsNotFull);

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
						key={increment()}
						qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
					></CardConfigItem>
				))}
			{openState && nonFullRiverCards.length > 0 && <Divider />}

			{openState && <NewButtons></NewButtons>}

			{openState && fullRiverCards.length > 0 && <Divider />}
			{openState && fullRiverCards.length > 0 && (
				<NestedMenuItem label="Full cards: " parentMenuOpen={true}>
					<MenuItem ref={fullCardsRef} style={{ position: "absolute" }}></MenuItem>
					{fullRiverCards.map((cardConfig) => (
						<CardConfigItem
							cardConfig={cardConfig}
							key={increment()}
							qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
						></CardConfigItem>
					))}
				</NestedMenuItem>
			)}
		</Menu>
	);
}

//TODO-NICE: make selection-dropable on buttons, so that they can be send to cards, make this the default instead of context-menu?
// imagine: toolbar with new Note, new A, new Q | all the cards and you can drop off

//TODO-NICE: delete extracted str in source

export const ContextMenuContainer = connect(getContextMenuInitData)(ContextMenu);
