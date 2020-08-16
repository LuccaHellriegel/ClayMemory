import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRiverMakeUps } from "../../selectors";
import React from "react";
import cards from "../../../cards";
import { incrementer } from "../../../../shared/utils";
import { ChildCardRiver } from "../CardRiver/ChildCardRiver";

//TODO-RC: SummaryRiver "searchable", so that you can zoom to certain rivers and also look at them next to each other (like PageChooser but needs different visuals)
//TODO-RC: make cards searchable when looking at River/Material
//TODO-RC: make separate Summary View that goes from left to right -> focus on active River
export const SummaryRiver = () => {
	const cardConfigs = useSelector(cards.selectors.getCards);
	const riverMakeUps = Object.values(useSelector(getRiverMakeUps));

	const increment = incrementer();
	//TODO-NICE: find way to make UI-text unselectable globally, maybe different focus? But might be unperformant
	return (
		<Grid container justify="flex-start" direction="row" alignItems="stretch" spacing={1}>
			{riverMakeUps.map((makeUp) => (
				<Grid item>
					<ChildCardRiver
						riverID={makeUp.riverID}
						riverCards={makeUp.cardIDs.length > 0 ? makeUp.cardIDs.map((id) => cardConfigs[id]) : []}
						key={increment()}
					></ChildCardRiver>
				</Grid>
			))}
		</Grid>
	);
};
