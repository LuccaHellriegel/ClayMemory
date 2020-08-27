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
			const boundingRect = (focusRef.current as HTMLDivElement).getBoundingClientRect();
			//TODO-NICE: 100 is just experience on 22', I assume that then the River is in the top row
			// we need to scroll to top otherwise it is covered by the AppBar
			if (boundingRect.y < 100) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			} else {
				(focusRef.current as HTMLDivElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
			}
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
