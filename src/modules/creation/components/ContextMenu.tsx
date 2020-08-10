import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { triggerSelectionGrab } from "../actions";
import { incrementer } from "../../../shared/utils";
import river from "../../river";
import { CardConfig, CardType, CreationType } from "../../cards/model";
import analyze from "../../analyze";

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => (
	<MenuItem
		onClick={() => {
			dispatchRiver(cardConfig.type, "NOTE", cardConfig.cardID);
		}}
	>
		{cardConfig.type}
	</MenuItem>
);

type dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string | undefined) => void;

const QAOptionItem = ({
	cardConfig,
	dispatchRiver,
	qaRef,
}: {
	cardConfig: CardConfig;
	dispatchRiver: dispatchRiver;
	qaRef: RefObject<any> | undefined;
}) => (
	<NestedMenuItem label="Q-A" parentMenuOpen={true}>
		<MenuItem
			ref={qaRef}
			onClick={() => {
				dispatchRiver("Q-A", "Q", cardConfig.cardID);
			}}
		>
			Q
		</MenuItem>
		<MenuItem
			onClick={() => {
				dispatchRiver("Q-A", "A", cardConfig.cardID);
			}}
		>
			A
		</MenuItem>
	</NestedMenuItem>
);

const CardConfigItem = ({
	cardConfig,
	dispatchRiver,
	qaRef,
}: {
	cardConfig: CardConfig;
	dispatchRiver: dispatchRiver;
	qaRef?: RefObject<any>;
}) => {
	switch (cardConfig.type) {
		case "Q-A":
			return <QAOptionItem cardConfig={cardConfig} dispatchRiver={dispatchRiver} qaRef={qaRef}></QAOptionItem>;
		default:
			return <SingleOptionItem cardConfig={cardConfig} dispatchRiver={dispatchRiver}></SingleOptionItem>;
	}
};

const partialRiverDispatch = (riverID: string, dispatch: any) => {
	return (type: CardType, creationType: CreationType, cardID?: string) => {
		dispatch(triggerSelectionGrab(riverID, type, creationType, cardID));
	};
};

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
	const riverID = useSelector(river.selectors.getActiveRiverMakeUpID);
	const dispatchRiverOne = partialRiverDispatch(riverID, dispatch);

	const increment = incrementer();
	const qaRefIndex = incrementer();

	// TODO: need to check for state before rendering MenuItems,
	// otherwise it shows up for a split-second when switching the menu off after adding to the river
	// weird Race Condition even if I dispatch closeContextMenu first?
	return (
		<Menu
			ref={menuRef}
			keepMounted
			open={state}
			anchorReference="anchorPosition"
			anchorPosition={state ? { top: position.y, left: position.x } : undefined}
		>
			{state &&
				riverCards.map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						dispatchRiver={dispatchRiverOne}
						key={increment()}
						qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
					></CardConfigItem>
				))}
			{state && riverCards.length > 0 && <Divider />}

			<NewQACard
				onClick={() => {
					dispatchRiverOne("Q-A", "Q");
				}}
			></NewQACard>
			<NewNoteCard
				onClick={() => {
					dispatchRiverOne("Note", "NOTE");
				}}
			></NewNoteCard>
		</Menu>
	);
}

export const ContextMenuContainer = analyze.components.DataGuardHOC(ContextMenu, getContextMenuInitData);
