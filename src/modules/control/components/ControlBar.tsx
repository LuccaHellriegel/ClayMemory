import display from "../../display";
import focus from "../../focus";
import React, { ChangeEvent } from "react";
import { AppBar, Toolbar, Divider, Tabs, Tab, Grid, TextField, Card, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Options } from "./Options";
import { CardSearchBar } from "./CardSearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";
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
		<Grid
			item
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("CONTROL"));
			}}
		>
			<AppBar>
				<Toolbar variant="regular">
					<Grid item>
						<Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
							<Grid item style={{ width: "12%" }}>
								<display.components.PageChooser></display.components.PageChooser>
							</Grid>

							<Grid item>
								<display.components.PageNavigation></display.components.PageNavigation>
							</Grid>

							<Grid item>
								<Card variant="outlined">
									<Tabs value={value} onChange={handleChange}>
										<Tab label="ActiveRiver" />
										<Tab label="SummaryRiver" />
									</Tabs>
								</Card>
							</Grid>

							<Grid item>
								<UndoRedoCard></UndoRedoCard>
							</Grid>
						</Grid>
					</Grid>

					<Typography style={{ flexGrow: 1 }}>{materialName?.replace(".pdf", "")}</Typography>

					<ShowHideButton></ShowHideButton>
					<Options></Options>
					<CardSearchBar></CardSearchBar>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};
