import React, { useState, Fragment } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { resetManuallySelectedString } from "../actions";
import { getCurrentSelectedString } from "../selectors";
import focus from "../../focus";

export const SelectionSnackbar = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const selectedString = useSelector(getCurrentSelectedString);

	if (selectedString === "" && open) setOpen(false);

	if (selectedString !== "" && !open) setOpen(true);

	const handleClose = (event: any, reason: string) => {
		if (reason === "clickaway") {
			// do not close on clickaway
			event.preventDefault();
		} else {
			setOpen(false);
			dispatch(resetManuallySelectedString());
		}
	};

	const handleDismiss = () => {
		setOpen(false);
		dispatch(resetManuallySelectedString());
	};

	const message = (
		<Fragment>
			<div>{"Current Selection: "}</div>
			<div style={{ color: "green" }}> {selectedString}</div>
		</Fragment>
	);

	return (
		<Snackbar
			onMouseEnter={() => {
				dispatch(focus.actions.tryUpdateFocus("CONTROL"));
			}}
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
