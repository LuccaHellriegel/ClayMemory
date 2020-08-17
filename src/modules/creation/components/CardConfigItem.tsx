import React, { RefObject } from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem } from "@material-ui/core";
import { CardConfig, CardType, CreationType } from "../../cards/model";
import { useDispatch } from "react-redux";
import river from "../../river";

type dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string | undefined) => void;

//TODO-NICE: rename this to note
//TODO-NICE: entangle this dispatchRiver buisness and use hooks in the card components instead

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => {
	const dispatch = useDispatch();

	return (
		<MenuItem
			onClick={() => {
				dispatchRiver(cardConfig.type, "NOTE", cardConfig.cardID);
			}}
			onMouseEnter={() => {
				dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "NOTE"));
			}}
		>
			{cardConfig.type}
		</MenuItem>
	);
};

const QAOptionItem = ({
	cardConfig,
	dispatchRiver,
	qaRef,
}: {
	cardConfig: CardConfig;
	dispatchRiver: dispatchRiver;
	qaRef: RefObject<any> | undefined;
}) => {
	const dispatch = useDispatch();

	return (
		<NestedMenuItem label="Q-A" parentMenuOpen={true}>
			<MenuItem
				ref={qaRef}
				onClick={() => {
					dispatchRiver("Q-A", "Q", cardConfig.cardID);
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "Q"));
				}}
			>
				Q
			</MenuItem>
			<MenuItem
				onClick={() => {
					dispatchRiver("Q-A", "A", cardConfig.cardID);
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "A"));
				}}
			>
				A
			</MenuItem>
		</NestedMenuItem>
	);
};

export const CardConfigItem = ({
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
