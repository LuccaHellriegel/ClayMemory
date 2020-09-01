import React from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import creation from "../modules/extraction";
import river from "../modules/river";
import { makeStyles, Theme, createStyles, useScrollTrigger, Zoom, Toolbar, Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import selection from "../modules/selection";

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
	return (
		<div>
			<control.components.ControlContainer></control.components.ControlContainer>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<control.components.ControlBar></control.components.ControlBar>
				<Toolbar id="back-to-top-anchor" />

				<river.components.ActiveRiverView></river.components.ActiveRiverView>
				<river.components.SummaryRiverView></river.components.SummaryRiverView>
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
