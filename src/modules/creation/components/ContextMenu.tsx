import React, { RefObject } from "react";
import Menu from "@material-ui/core/Menu";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem, Divider } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { getContextMenuInitData } from "../selectors";
import analyze from "../../analyze";
import { CardConfig, RiverMakeUp, CardType } from "../../river/model";
import { triggerSelectionGrab } from "../actions";
import { incrementer } from "../../../shared/utils";

// Reminder: need to capture all the text/nodes before the menu is opened because of the invisible div
// it is necessary to close on right-click, because menu renders invisible diff that makes selection impossible
// Source: https://stackoverflow.com/questions/61456322/how-do-you-close-the-material-ui-context-menu-without-displaying-the-default-co

//TODO: maybe pre-calculate on changing layout?

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
	console.log(cardConfig.type);
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

const partialRiverDispatch = (riverIndex: number, dispatch: any) => {
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
	boundingRectGroup?: DOMRect[];
	state?: boolean;
	menuRef?: RefObject<any>;
	riverMakeUps?: RiverMakeUp[];
}) {
	const dispatch = useDispatch();
	const dispatchRiverOne = partialRiverDispatch(0, dispatch);
	const dispatchRiverTwo = partialRiverDispatch(1, dispatch);

	const riverOneIsInUse = riverMakeUps && riverMakeUps[0];
	const riverTwoIsInUse = riverMakeUps && riverMakeUps[1];

	const increment = incrementer();

	return boundingRectGroup && state !== undefined ? (
		<Menu
			ref={menuRef}
			keepMounted
			open={state}
			anchorReference="anchorPosition"
			anchorPosition={state ? { top: boundingRectGroup[0].y, left: boundingRectGroup[0].x } : undefined}
		>
			{state &&
				riverOneIsInUse &&
				(riverMakeUps as RiverMakeUp[])[0].map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						onClick={() => {
							dispatchRiverOne(cardConfig.type, cardConfig.cardIndex);
						}}
						key={increment()}
					></CardConfigItem>
				))}
			{riverOneIsInUse && <Divider />}

			{state &&
				riverTwoIsInUse &&
				(riverMakeUps as RiverMakeUp[])[1].map((cardConfig) => (
					<CardConfigItem
						cardConfig={cardConfig}
						onClick={() => {
							dispatchRiverTwo(cardConfig.type, cardConfig.cardIndex);
						}}
						key={increment()}
					></CardConfigItem>
				))}
			{riverTwoIsInUse && <Divider />}

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
	) : null;
}

export const ContextMenuContainer = connect(analyze.utils.createDataConditionalSelector(getContextMenuInitData))(
	ContextMenu
);
