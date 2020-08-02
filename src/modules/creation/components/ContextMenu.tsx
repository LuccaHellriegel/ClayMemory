import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import { CardConfig, RiverMakeUp, CardType } from "../../river/model";
import { triggerSelectionGrab } from "../actions";
import { incrementer } from "../../../shared/utils";
import { DataGuardHOC } from "../../analyze/components";
import river from "../../river";
import { CreationType } from "../model";

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewClozeCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Cloze</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => (
	<MenuItem
		onClick={() => {
			dispatchRiver(cardConfig.type, cardConfig.type === "Note" ? "NOTE" : "CLOZE", cardConfig.cardIndex);
		}}
	>
		{cardConfig.type}
	</MenuItem>
);

type dispatchRiver = (type: CardType, creationType: CreationType, cardIndex?: number | undefined) => void;

const QAOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => (
	<NestedMenuItem label="Q-A" parentMenuOpen={true}>
		<MenuItem
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

const CardConfigItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => {
	switch (cardConfig.type) {
		case "Q-A":
			return <QAOptionItem cardConfig={cardConfig} dispatchRiver={dispatchRiver}></QAOptionItem>;
		default:
			return <SingleOptionItem cardConfig={cardConfig} dispatchRiver={dispatchRiver}></SingleOptionItem>;
	}
};

const partialRiverDispatch = (riverIndex: string, dispatch: any) => {
	return (type: CardType, creationType: CreationType, cardIndex?: number) => {
		dispatch(triggerSelectionGrab(riverIndex, type, creationType, cardIndex));
	};
};

function ContextMenu({
	boundingRectGroup,
	state,
	menuRef,
	riverMakeUps,
}: {
	boundingRectGroup: DOMRect[];
	state: boolean;
	menuRef: RefObject<any>;
	riverMakeUps: RiverMakeUp[];
}) {
	const dispatch = useDispatch();
	const dispatchRiverOne = partialRiverDispatch(river.constants.RiverMakeUpID, dispatch);

	const increment = incrementer();

	return (
		<Menu
			ref={menuRef}
			keepMounted
			open={state}
			anchorReference="anchorPosition"
			anchorPosition={state ? { top: boundingRectGroup[0].y, left: boundingRectGroup[0].x } : undefined}
		>
			{riverMakeUps[0].cards.map((cardConfig) => (
				<CardConfigItem cardConfig={cardConfig} dispatchRiver={dispatchRiverOne} key={increment()}></CardConfigItem>
			))}
			{riverMakeUps[0].cards.length > 0 && <Divider />}

			<NewQACard
				onClick={() => {
					dispatchRiverOne("Q-A", "Q");
				}}
			></NewQACard>
			<NewClozeCard
				onClick={() => {
					dispatchRiverOne("Cloze", "CLOZE");
				}}
			></NewClozeCard>
			<NewNoteCard
				onClick={() => {
					dispatchRiverOne("Note", "NOTE");
				}}
			></NewNoteCard>
		</Menu>
	);
}

export const ContextMenuContainer = DataGuardHOC(ContextMenu, getContextMenuInitData);
