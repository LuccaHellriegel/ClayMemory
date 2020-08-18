import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRiverMakeUps } from "../../selectors";
import React, { useRef, useEffect } from "react";
import cards from "../../../cards";
import focus from "../../../focus";
import display from "../../../display";
import { incrementer } from "../../../../shared/utils";
import { ChildCardRiver } from "../CardRiver/ChildCardRiver";
import { riverMakeUpIDToPageNumber } from "../../model";

//TODO-RC: make cards searchable when looking at River/Material
//TODO-PREF: memoize Rivers (not necessary right now, because we just hide)

export const SummaryRiver = () => {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);
	const currentPage = useSelector(display.selectors.getCurrentPage);
	const cardConfigs = useSelector(cards.selectors.getCards);
	const riverMakeUps = Object.values(useSelector(getRiverMakeUps));
	const focusRef = useRef<HTMLDivElement | null>(null);

	// the current-page river is scrolled into view
	useEffect(() => {
		if (displayFocus === "SUMMARY_RIVER" && focusRef.current !== null) {
			(focusRef.current as HTMLDivElement).focus();
			(focusRef.current as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
		}
	}, [displayFocus, currentPage]);

	const increment = incrementer();
	//TODO-NICE: find way to make UI-text unselectable globally, maybe different focus? But might be unperformant
	return (
		<Grid container justify="flex-start" direction="row" alignItems="stretch" spacing={1}>
			{riverMakeUps.map((makeUp) =>
				makeUp.cardIDs.length > 0 ? (
					<Grid
						item
						ref={riverMakeUpIDToPageNumber(makeUp.riverID) === currentPage ? focusRef : null}
						key={increment()}
					>
						<ChildCardRiver
							riverID={makeUp.riverID}
							riverCards={makeUp.cardIDs.map((id) => cardConfigs[id])}
							key={increment()}
						></ChildCardRiver>
					</Grid>
				) : null
			)}
		</Grid>
	);
};
