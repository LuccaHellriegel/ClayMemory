import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector, connect } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { grabSelectionForSourceMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType, SourceCard, QACardContent } from "../../cards/model";
import cards from "../../cards";
import { CardConfigItem, noteCardIsEmpty, qaCardIsNotFull } from "./CardItems";
import { NewButtons } from "./NewButtons";
import NestedMenuItem from "material-ui-nested-menu-item";

function SourceMenu({
	menuRef,
	qaRefs,
	riverCards,
}: {
	menuRef: RefObject<any>;
	qaRefs: RefObject<any>[];
	riverCards: CardConfig[];
}) {
	const dispatch = useDispatch();
	const sourceCard = useSelector(cards.selectors.getSourceCard);
	const openState = !!sourceCard;
	const dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string) => {
		dispatch(
			grabSelectionForSourceMenu(
				type,
				creationType,
				(sourceCard as SourceCard).sourceField,
				(sourceCard as SourceCard).origin,
				cardID
			)
		);
	};

	const increment = incrementer();
	const qaRefIndex = incrementer();
	const anchorPosition = sourceCard ? { top: sourceCard.y, left: sourceCard.x } : undefined;

	//TODO-PERF: use partition function, or loop to avoid double iteration
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

export const SourceMenuContainer = connect(getContextMenuInitData)(SourceMenu);
