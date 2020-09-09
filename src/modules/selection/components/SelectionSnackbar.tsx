import React, { useState, Fragment } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
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

	const message = (
		<Fragment>
			<div>{"Current Selection: "}</div>
			<div style={{ color: "green" }}> {sourceConfig?.contentStr}</div>
		</Fragment>
	);

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={open}
			onClose={handleClose}
			message={message}
			action={
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleDismiss}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	);
};
