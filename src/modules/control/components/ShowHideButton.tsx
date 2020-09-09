import display from "../../display";
import river from "../../river";
import React from "react";
import { IconButton, Menu, FormControlLabel, Typography, Divider, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { GreenCheckbox } from "../../../shared/GreenCheckbox";

const ShowRiverCheckbox = () => {
	const dispatch = useDispatch();
	const riverShowState = useSelector(river.selectors.getRiverShowState);

	return (
		<FormControlLabel
			control={
				<GreenCheckbox
					checked={riverShowState === "SHOW"}
					onClick={() => {
						dispatch(river.actions.toggleRiverShowState());
					}}
				/>
			}
			label="River"
		/>
	);
};

const ShowMaterialCheckbox = () => {
	const dispatch = useDispatch();
	const displayShowState = useSelector(display.selectors.getDisplayStatus);

	return (
		<FormControlLabel
			control={
				<GreenCheckbox
					checked={displayShowState === "SHOW"}
					onClick={() => {
						dispatch(display.actions.toggleDisplayState());
					}}
				/>
			}
			label="Material"
		/>
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
			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<Typography>Show:</Typography>
				<Divider></Divider>
				<Grid container direction="row">
					<Grid item>
						<river.components.RiverContentFormGroup></river.components.RiverContentFormGroup>
					</Grid>
					<Grid item>
						<Divider orientation="vertical"></Divider>
					</Grid>
					<Grid item>
						{
							<Grid container direction="column">
								<Grid item>
									<ShowRiverCheckbox></ShowRiverCheckbox>
								</Grid>
								<Grid item>
									<ShowMaterialCheckbox></ShowMaterialCheckbox>
								</Grid>
							</Grid>
						}
					</Grid>
				</Grid>
			</Menu>
		</div>
	);
};
