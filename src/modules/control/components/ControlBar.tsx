import display from "../../display";
import React from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Options } from "./Options/Options";
import { ClayMemorySearchBar } from "./ClayMemorySearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";

//TODO-NICE: download/load csv for Anki
export const ControlBar = () => {
	const materialName = useSelector(display.selectors.getPDFName);

	return (
		<display.components.PageKeyboardControl>
			<AppBar>
				<Toolbar variant="regular">
					<Grid item>
						<Grid container spacing={1} direction="row" alignItems="center" justify="flex-start">
							<Grid item style={{ width: "20%" }}>
								<display.components.PageChooser></display.components.PageChooser>
							</Grid>

							<Grid item>
								<display.components.PageNavigation></display.components.PageNavigation>
							</Grid>

							<Grid item>
								<UndoRedoCard></UndoRedoCard>
							</Grid>
						</Grid>
					</Grid>

					<Typography style={{ flexGrow: 1 }}>{materialName?.replace(".pdf", "")}</Typography>
					<Grid item>
						<ClayMemorySearchBar></ClayMemorySearchBar>
					</Grid>
					<ShowHideButton></ShowHideButton>
					<Options></Options>
				</Toolbar>
			</AppBar>
		</display.components.PageKeyboardControl>
	);
};
