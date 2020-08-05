import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { RiverMakeUp } from "../../river/model";
import { triggerSelectionGrab } from "../actions";
import { incrementer } from "../../../shared/utils";
import { DataGuardHOC } from "../../analyze/components";
import river from "../../river";
import { CardConfig, CardType, CreationType } from "../../cards/model";

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => (
	<MenuItem
		onClick={() => {
			dispatchRiver(cardConfig.type, "NOTE", cardConfig.cardIndex);
		}}
	>
		{cardConfig.type}
	</MenuItem>
);

type dispatchRiver = (type: CardType, creationType: CreationType, cardIndex?: number | undefined) => void;

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
				dispatchRiver("Q-A", "Q", cardConfig.cardIndex);
			}}
		>
			Q
		</MenuItem>
		<MenuItem
			onClick={() => {
				dispatchRiver("Q-A", "A", cardConfig.cardIndex);
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
	return (type: CardType, creationType: CreationType, cardIndex?: number) => {
		dispatch(triggerSelectionGrab(riverID, type, creationType, cardIndex));
	};
};

function ContextMenu({
	boundingRectGroup,
	state,
	menuRef,
	qaRefs,
	riverMakeUps,
}: {
	boundingRectGroup: DOMRect[];
	state: boolean;
	menuRef: RefObject<any>;
	qaRefs: RefObject<any>[];
	riverMakeUps: RiverMakeUp[];
}) {
	const dispatch = useDispatch();
	const dispatchRiverOne = partialRiverDispatch(river.constants.RiverMakeUpID, dispatch);

	const increment = incrementer();
	const qaRefIndex = incrementer();

	// need to check for state before rendering MenuItems,
	// otherwise it shows up for a split-second when switching the menu off after adding to the river
	// weird Race Condition even if I dispatch closeContextMenu first?
	return (
		<Menu
			ref={menuRef}
			keepMounted
			open={state}
			anchorReference="anchorPosition"
			anchorPosition={state ? { top: boundingRectGroup[0].y, left: boundingRectGroup[0].x } : undefined}
		>
			{state &&
				riverMakeUps[0].cards.map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						dispatchRiver={dispatchRiverOne}
						key={increment()}
						qaRef={cardConfig.type === "Q-A" ? qaRefs[qaRefIndex()] : undefined}
					></CardConfigItem>
				))}
			{state && riverMakeUps[0].cards.length > 0 && <Divider />}

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

export const ContextMenuContainer = DataGuardHOC(ContextMenu, getContextMenuInitData);
