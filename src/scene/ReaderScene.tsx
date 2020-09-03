import React from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import creation from "../modules/extraction";
import { makeStyles, Theme, createStyles, useScrollTrigger, Zoom, Toolbar, Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import selection from "../modules/selection";
import river from "../modules/river";
import focus from "../modules/focus";
import { useSelector } from "react-redux";
import display from "../modules/display";

//TODO: make show/hide depdendant on tab, also Page choice, control-bar dependant on tab

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
	})
);

function ScrollTop(props: any) {
	const { children } = props;
	const classes = useStyles();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector("#back-to-top-anchor");

		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}

export function ReaderScene() {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);
	const showMaterial = useSelector(display.selectors.displayStatusIsShow);
	const showRiver = useSelector(river.selectors.riverShowStateIsShow);

	return (
		<div>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<control.components.ControlBar></control.components.ControlBar>
				<Toolbar id="back-to-top-anchor" />

				<Grid item hidden={displayFocus !== "ACTIVE_RIVER"}>
					<Grid container justify="space-around" direction="row" alignItems="stretch">
						<Grid
							item
							style={{
								width: "38%",
							}}
							hidden={!showRiver}
						>
							<river.components.ActiveCardRiver></river.components.ActiveCardRiver>
						</Grid>
						<display.components.MaterialDisplayColumnWithSize
							hidden={!showMaterial}
						></display.components.MaterialDisplayColumnWithSize>
					</Grid>
				</Grid>

				<Grid item hidden={displayFocus !== "SUMMARY_RIVER"}>
					<river.components.SummaryRiver></river.components.SummaryRiver>
				</Grid>
			</Grid>
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
			<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
		</div>
	);
}
