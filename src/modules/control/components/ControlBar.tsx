import display from "../../display";
import focus from "../../focus";
import React, { ChangeEvent } from "react";
import { AppBar, Toolbar, Tabs, Tab, Grid, Card, Typography, Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Options } from "./Options";
import { CardSearchBar } from "./CardSearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";
import text from "../../text";

//TODO-NICE: download/load csv for Anki
export const ControlBar = () => {
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

	const materialName = useSelector(display.selectors.getPDFName);

	return (
		<Grid item>
			<display.components.PageKeyboardControl>
				<AppBar>
					<Toolbar variant="regular">
						<Grid item>
							<Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
								<Grid item style={{ width: "15%" }}>
									<display.components.PageChooser></display.components.PageChooser>
								</Grid>

								<Grid item>
									<display.components.PageNavigation></display.components.PageNavigation>
								</Grid>

								<Grid item>
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
								</Grid>

								<Grid item>
									<UndoRedoCard></UndoRedoCard>
								</Grid>
							</Grid>
						</Grid>

						<Typography style={{ flexGrow: 1 }}>{materialName?.replace(".pdf", "")}</Typography>

						<CardSearchBar></CardSearchBar>
						<ShowHideButton></ShowHideButton>
						<Options></Options>
					</Toolbar>
				</AppBar>
			</display.components.PageKeyboardControl>
		</Grid>
	);
};
