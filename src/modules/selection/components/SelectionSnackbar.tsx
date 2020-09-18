import React, { useState, Fragment, useEffect, useCallback } from "react";
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
			{sourceConfig?.contentOrigin && <div style={{ color: "red" }}> From Page {sourceConfig.contentOrigin.page}</div>}
		</Fragment>
	);
	//TODO-RC: REPLACE-button, also make APPEND with empty space between stuff, maybe Newline?

	//TODO-NICE: support IE/Edge values for ArrowRight etc

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
			message={message}
			action={
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleDismiss}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	);
};
