import React, { ChangeEvent } from "react";
import { Tabs, Tab, Card, Tooltip } from "@material-ui/core";
import text from "../../text";
import focus from "../../focus";

import { useDispatch, useSelector } from "react-redux";

export const ViewTabs = () => {
	const dispatch = useDispatch();
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);

	const value = displayFocus === "ACTIVE_RIVER" ? 0 : 1;

	const handleChange = (_: ChangeEvent<{}>, newValue: number) => {
		dispatch(
			newValue === 0
				? focus.actions.updateDisplayFocus("ACTIVE_RIVER")
				: focus.actions.updateDisplayFocus("SUMMARY_RIVER")
		);
	};

	return (
		<Card variant="outlined">
			<Tabs value={value} onChange={handleChange}>
				<Tab
					label={
						<Tooltip
							title={text.constants.switchToActiveRiverTooltip}
							enterDelay={text.constants.defaultEnterDelay}
							enterNextDelay={500}
							disableFocusListener={true}
						>
							<span>ActiveRiver</span>
						</Tooltip>
					}
				></Tab>
				<Tab
					label={
						<Tooltip
							title={text.constants.switchToSummaryRiverTooltip}
							enterDelay={text.constants.defaultEnterDelay}
							enterNextDelay={500}
							disableFocusListener={true}
						>
							<span>SummaryRiver</span>
						</Tooltip>
					}
				/>
			</Tabs>
		</Card>
	);
};
