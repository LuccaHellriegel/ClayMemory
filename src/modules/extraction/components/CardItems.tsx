import React, { RefObject } from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem } from "@material-ui/core";
import { CardConfig, CardType, CreationType } from "../../cards/model/model";
import { QACardContent } from "../../cards/model/model-content";
import { useDispatch } from "react-redux";
import river from "../../river";

//TODO-NICE: move to cards
export const noteCardIsEmpty = (content: string) => content === "";
export const qaCardIsNotFull = (content: QACardContent) =>
	(content as QACardContent).q === "" || (content as QACardContent).a === "";

type dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string | undefined) => void;

//TODO-NICE: rename this to note
//TODO-NICE: entangle this dispatchRiver buisness and use hooks in the card components instead

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => {
	const dispatch = useDispatch();

	return (
		<MenuItem
			onClick={() => {
				dispatchRiver(cardConfig.type, "note", cardConfig.cardID);
			}}
			onMouseEnter={() => {
				dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "note"));
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
					dispatchRiver("Q-A", "q", cardConfig.cardID);
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "q"));
				}}
			>
				Q
			</MenuItem>
			<MenuItem
				onClick={() => {
					dispatchRiver("Q-A", "a", cardConfig.cardID);
				}}
				onMouseEnter={() => {
					dispatch(river.actions.trySetHoveredCard(cardConfig.cardID, "a"));
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
