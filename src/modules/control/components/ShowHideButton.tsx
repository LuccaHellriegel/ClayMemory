import display from "../../display";
import river from "../../river";
import React from "react";
import { IconButton, Menu, Typography, Grid, Card, Button, FormControlLabel } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";

const ShowRiverCheckbox = () => {
	const dispatch = useDispatch();
	const riverShowState = useSelector(river.selectors.getRiverShowState);

	return (
		<Button
			startIcon={
				<FormControlLabel
					label="River"
					control={<GreenCheckbox checked={riverShowState === "SHOW"} />}
				></FormControlLabel>
			}
			variant="contained"
			color="primary"
			onClick={() => {
				dispatch(river.actions.toggleRiverShowState());
			}}
		></Button>
	);
};

const ShowMaterialCheckbox = () => {
	const dispatch = useDispatch();
	const displayShowState = useSelector(display.selectors.getDisplayStatus);

	return (
		<Button
			startIcon={
				<FormControlLabel
					label="Material"
					control={<GreenCheckbox checked={displayShowState === "SHOW"} />}
				></FormControlLabel>
			}
			variant="contained"
			color="primary"
			onClick={() => {
				dispatch(display.actions.toggleDisplayState());
			}}
		></Button>
	);
};

export const ShowHideButton = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton type="button" onClick={handleClick}>
				<VisibilityIcon></VisibilityIcon>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{ style: { paddingLeft: "8px", paddingRight: "8px" } }}
			>
				<Typography variant="h6">Show:</Typography>
				<Grid container direction="row" justify="space-between" spacing={1}>
					<Grid item>
						<Card variant="outlined" style={{ paddingLeft: "4px", paddingRight: "4px" }}>
							<river.components.RiverContentFormGroup></river.components.RiverContentFormGroup>
						</Card>
					</Grid>

					<Grid item>
						<Card variant="outlined" style={{ padding: "4px" }}>
							<Grid container direction="column" spacing={1}>
								<Grid item>
									<ShowRiverCheckbox></ShowRiverCheckbox>
								</Grid>
								<Grid item>
									<ShowMaterialCheckbox></ShowMaterialCheckbox>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</Menu>
		</div>
	);
};
