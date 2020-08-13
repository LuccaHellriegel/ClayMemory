import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import { MenuItem, Divider } from "@material-ui/core";
import { useDispatch, useSelector, connect } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { grabSelectionForSourceMenu } from "../actions";
import { incrementer } from "../../../shared/utils";
import { CardConfig, CardType, CreationType, SourceCard } from "../../cards/model";
import cards from "../../cards";
import { CardConfigItem } from "./CardConfigItem";

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

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

export const SourceMenuContainer = connect(getContextMenuInitData)(SourceMenu);
