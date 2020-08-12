import { Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRiverMakeUps } from "../selectors";
import React from "react";
import cards from "../../cards";
import { ChildCardRiver } from "./ChildCardRiver";
import { incrementer } from "../../../shared/utils";

//TODO-RC: SummaryRiver "searchable", so that you can zoom to certain rivers and also look at them next to each other

export const SummaryRiver = () => {
	const cardConfigs = useSelector(cards.selectors.getCards);
	const riverMakeUps = Object.values(useSelector(getRiverMakeUps));

	const increment = incrementer();
	//TODO-NICE: find way to make UI-text unselectable globally, maybe different focus? But might be unperformant
	return (
		<Paper elevation={5}>
			<Typography
				variant="h4"
				align="center"
				style={{ MozUserSelect: "none", WebkitUserSelect: "none", msUserSelect: "none" }}
			>
				SummaryRiver
			</Typography>
			{riverMakeUps.map((makeUp) => (
				<ChildCardRiver
					riverID={makeUp.riverID}
					riverCards={makeUp.cardIDs.length > 0 ? makeUp.cardIDs.map((id) => cardConfigs[id]) : []}
					key={increment()}
				></ChildCardRiver>
			))}
		</Paper>
	);
};
