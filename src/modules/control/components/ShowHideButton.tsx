import river from "../../river";
import React from "react";
import { IconButton, Menu, Typography, Grid, Card } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import pdf from "../../pdf";

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
									<river.components.ShowRiverCheckbox></river.components.ShowRiverCheckbox>
								</Grid>
								<Grid item>
									<pdf.components.ShowMaterialCheckbox></pdf.components.ShowMaterialCheckbox>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
			</Menu>
		</div>
	);
};
