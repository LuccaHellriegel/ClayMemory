import React, { useLayoutEffect, useRef } from "react";
import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import pdf from "../../../pdf";
import db from "../../../data";
import cards from "../../../cards";
import { ClayMemorySearchBar } from "./ClayMemorySearchBar";
import { ViewTabs } from "./ViewTabs";
import { getTopOffset } from "../../selectors";
import { actions } from "../../slice";
import { ShowHideButton } from "./ShowHideButton";

//TODO: download/load/sync csv for Anki
export const ControlBar = () => {
	const materialName = useSelector(pdf.selectors.getPDFName);
	const offset = useSelector(getTopOffset);
	const ref = useRef<null | HTMLDivElement>(null);

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		if (ref.current) {
			const currentBottom = ref.current.getBoundingClientRect().bottom;
			if (currentBottom !== offset) dispatch(actions.topOffset(currentBottom));
		}
	}, [ref, dispatch, offset]);

	return (
		<pdf.components.PageKeyboardControl>
			<AppBar ref={ref} position="sticky">
				<Toolbar variant="regular" disableGutters>
					<Grid container direction="row" alignItems="center" justify="space-between">
						<Grid item xs={6}>
							<Grid container direction="row" alignItems="center" spacing={1} style={{ paddingLeft: "4px" }}>
								<Grid item style={{ maxWidth: "15%" }}>
									<pdf.components.PageChooser></pdf.components.PageChooser>
								</Grid>

								<Grid item>
									<pdf.components.PageNavigation></pdf.components.PageNavigation>
								</Grid>

								<Grid item>
									<cards.components.UndoRedoCard></cards.components.UndoRedoCard>
								</Grid>

								<Grid item>
									<ViewTabs></ViewTabs>
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
									<db.components.DataOptions></db.components.DataOptions>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</pdf.components.PageKeyboardControl>
	);
};
