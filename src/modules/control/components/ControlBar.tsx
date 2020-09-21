import display from "../../display";
import React, { useLayoutEffect, useRef } from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "./Options/Options";
import { ClayMemorySearchBar } from "./ClayMemorySearchBar";
import { UndoRedoCard } from "./UndoRedoButtons";
import { ShowHideButton } from "./ShowHideButton";

//TODO-NICE: download/load csv for Anki
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
			<AppBar ref={ref} position="sticky" style={{ width: "100%" }}>
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
