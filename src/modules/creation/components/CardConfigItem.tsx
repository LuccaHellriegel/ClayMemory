import React, { RefObject } from "react";
import NestedMenuItem from "material-ui-nested-menu-item";
import { MenuItem } from "@material-ui/core";
import { CardConfig, CardType, CreationType } from "../../cards/model";

type dispatchRiver = (type: CardType, creationType: CreationType, cardID?: string | undefined) => void;

const SingleOptionItem = ({ cardConfig, dispatchRiver }: { cardConfig: CardConfig; dispatchRiver: dispatchRiver }) => (
	<MenuItem
		onClick={() => {
			dispatchRiver(cardConfig.type, "NOTE", cardConfig.cardID);
		}}
	>
		{cardConfig.type}
	</MenuItem>
);

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
