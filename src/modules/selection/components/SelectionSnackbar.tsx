import React, { useState, useEffect } from "react";
import { Snackbar, IconButton, Typography, Card, Grid, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectionSource } from "../actions";
import { getSourceConfig } from "../selectors";

export const SelectionSnackbar = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const sourceConfig = useSelector(getSourceConfig);

	if (!!!sourceConfig && open) setOpen(false);

	if (!!sourceConfig && !open) setOpen(true);

	const handleClose = (event: any, reason: string) => {
		if (reason === "clickaway") {
			// do not close on clickaway
			event.preventDefault();
		} else {
			setOpen(false);
			dispatch(resetSelectionSource());
		}
	};

	const handleDismiss = () => {
		setOpen(false);
		dispatch(resetSelectionSource());
	};

	const escPress = (event: KeyboardEvent) => {
		if (open && (event.key === "Escape" || event.key === "Esc")) {
			handleDismiss();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", escPress);
		return () => {
			document.removeEventListener("keydown", escPress);
		};
	});

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={open}
			onClose={handleClose}
			message={
				<Grid container direction="row" spacing={1}>
					<Grid item>
						<Card
							variant="outlined"
							color="secondary"
							style={{ padding: "4px", color: "white", backgroundColor: "#3f51b5" }}
							square={true}
						>
							<Typography variant="h4">{"Selection:"}</Typography>
						</Card>

						<Card variant="outlined" style={{ padding: "4px", color: "black", backgroundColor: "white" }} square={true}>
							<Typography variant="body1">{sourceConfig?.contentStr}</Typography>
						</Card>
					</Grid>

					{sourceConfig?.contentOrigin && (
						<Grid item>
							<Card
								variant="outlined"
								color="secondary"
								style={{ padding: "4px", color: "black", backgroundColor: "white" }}
								square={true}
							>
								<Typography variant="h4">{"Origin:"}</Typography>
							</Card>

							<Card
								variant="outlined"
								style={{ padding: "4px", color: "white", backgroundColor: "#3f51b5" }}
								square={true}
							>
								<Typography variant="body1">Page {sourceConfig.contentOrigin.page}</Typography>
							</Card>
						</Grid>
					)}
				</Grid>
			}
			action={
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleDismiss}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	);
};
