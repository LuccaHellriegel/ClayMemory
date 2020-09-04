import React, { RefObject } from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem } from "@material-ui/core";
import { CardConfig } from "../../cards/model/model-config";
import { useDispatch } from "react-redux";
import river from "../../river";
import { dispatchCreationFromContextMenu } from "../actions";

//TODO-NICE: rename this to note

const SingleOptionItem = ({ cardConfig }: { cardConfig: CardConfig }) => {
	const dispatch = useDispatch();

	return (
		<MenuItem
			onClick={() => {
				dispatch(dispatchCreationFromContextMenu("note", cardConfig.cardID));
			}}
			onMouseEnter={() => {
				dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "note"));
			}}
		>
			{cardConfig.type}
		</MenuItem>
	);
};

const QAOptionItem = ({ cardConfig, qaRef }: { cardConfig: CardConfig; qaRef: RefObject<any> | undefined }) => {
	const dispatch = useDispatch();

	return (
		<NestedMenuItem
			label="Q-A"
			parentMenuOpen={true}
			onMouseEnter={() => {
				// hover over first field as default
				dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "q"));
			}}
		>
			<MenuItem
				ref={qaRef}
				onClick={() => {
					dispatch(dispatchCreationFromContextMenu("q", cardConfig.cardID));
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "q"));
				}}
			>
				Q-field
			</MenuItem>
			<MenuItem
				onClick={() => {
					dispatch(dispatchCreationFromContextMenu("a", cardConfig.cardID));
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "a"));
				}}
			>
				A-field
			</MenuItem>
		</NestedMenuItem>
	);
};

export const CardConfigItem = ({ cardConfig, qaRef }: { cardConfig: CardConfig; qaRef?: RefObject<any> }) => {
	switch (cardConfig.type) {
		case "Q-A":
			return <QAOptionItem cardConfig={cardConfig} qaRef={qaRef}></QAOptionItem>;
		default:
			return <SingleOptionItem cardConfig={cardConfig}></SingleOptionItem>;
	}
};
