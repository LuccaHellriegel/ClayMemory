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

const NewQACard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q-A</MenuItem>;
const NewClozeCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Cloze</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

const CardConfigItem = ({
	cardConfig,
	onClick,
	...props
}: {
	cardConfig: CardConfig;
	onClick: (event?: any) => void;
}) => {
	switch (cardConfig.type) {
		case "Q-A":
			return (
				<NestedMenuItem label="Q-A" parentMenuOpen={true} {...props}>
					<MenuItem>Q</MenuItem>
					<MenuItem>A</MenuItem>
				</NestedMenuItem>
			);
		case "Cloze":
			return (
				<MenuItem onClick={onClick} {...props}>
					Cloze
				</MenuItem>
			);
		case "Note":
			return (
				<MenuItem onClick={onClick} {...props}>
					Note
				</MenuItem>
			);
	}
};

const partialRiverDispatch = (riverIndex: string, dispatch: any) => {
	return (type: CardType, cardIndex?: number) => {
		dispatch(triggerSelectionGrab(riverIndex, type, cardIndex));
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
				<CardConfigItem
					cardConfig={cardConfig}
					onClick={() => {
						dispatchRiverOne(cardConfig.type, cardConfig.cardIndex);
					}}
					key={increment()}
				></CardConfigItem>
			))}
			{riverMakeUps[0].cards.length > 0 && <Divider />}

			<NewQACard
				onClick={() => {
					dispatchRiverOne("Q-A");
				}}
			></NewQACard>
			<NewClozeCard
				onClick={() => {
					dispatchRiverOne("Cloze");
				}}
			></NewClozeCard>
			<NewNoteCard
				onClick={() => {
					dispatchRiverOne("Note");
				}}
			></NewNoteCard>
		</Menu>
	);
}

export const ContextMenuContainer = DataGuardHOC(ContextMenu, getContextMenuInitData);
