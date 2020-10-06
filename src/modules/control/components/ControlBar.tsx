import display from "../../display";
import React, { useLayoutEffect, useRef } from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Options/Options";
import { ClayMemorySearchBar } from "./ClayMemorySearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";

//TODO: download/load csv for Anki
export const ControlBar = () => {
	const materialName = useSelector(display.selectors.getPDFName);
	const offset = useSelector(display.selectors.getTopOffset);
	const ref = useRef<null | HTMLDivElement>(null);

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		if (ref.current) {
			const currentBottom = ref.current.getBoundingClientRect().bottom;
			if (currentBottom !== offset) dispatch(display.actions.setTopOffset(currentBottom));
		}
	}, [ref, dispatch, offset]);

	return (
		<display.components.PageKeyboardControl>
			<AppBar ref={ref} position="sticky">
				<Toolbar variant="regular" disableGutters>
					<Grid container direction="row" alignItems="center" justify="space-between">
						<Grid item xs={6}>
							<Grid container direction="row" alignItems="center" spacing={1} style={{ paddingLeft: "4px" }}>
								<Grid item style={{ maxWidth: "15%" }}>
									<display.components.PageChooser></display.components.PageChooser>
								</Grid>

								<Grid item>
									<display.components.PageNavigation></display.components.PageNavigation>
								</Grid>

								<Grid item>
									<UndoRedoCard></UndoRedoCard>
								</Grid>

								<Grid item>
									<display.components.ViewTabs></display.components.ViewTabs>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={2}>
							<Grid container justify="center">
								<Grid item style={{ overflowX: "auto" }}>
									<Typography variant="subtitle1">{materialName?.replace(".pdf", "")}</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={4}>
							<Grid container direction="row" justify="flex-end" alignItems="center">
								<Grid item>
									<ClayMemorySearchBar></ClayMemorySearchBar>
								</Grid>
								<Grid item>
									<ShowHideButton></ShowHideButton>
								</Grid>
								<Grid item>
									<Options></Options>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</display.components.PageKeyboardControl>
	);
};
