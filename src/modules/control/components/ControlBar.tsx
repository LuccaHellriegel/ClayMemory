import display from "../../display";
import React from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Options } from "./Options/Options";
import { CardSearchBar } from "./CardSearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";
import { ViewTabs } from "./ViewTabs";

//TODO-NICE: download/load csv for Anki
export const ControlBar = () => {
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
									<ViewTabs></ViewTabs>
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
