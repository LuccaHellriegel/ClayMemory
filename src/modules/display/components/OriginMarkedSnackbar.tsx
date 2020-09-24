import { Button, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpanOrigin } from "../selectors";
import { resetSpanOrigin } from "../actions";

//TODO-NICE: think about that SelectionSnackbar and this both are dismissed via Esc

export const OriginMarkedSnackbar = () => {
	const [open, setOpen] = useState(false);
	const spanOrigin = useSelector(getSpanOrigin);
	const dispatch = useDispatch();

	if (!!!spanOrigin && open) setOpen(false);

	if (!!spanOrigin && !open) setOpen(true);

	const handleClose = (event: any, reason: string) => {
		if (reason === "clickaway") {
			// do not close on clickaway
			event.preventDefault();
		} else {
			setOpen(false);
			dispatch(resetSpanOrigin());
		}
	};

	const handleDismiss = () => {
		setOpen(false);
		dispatch(resetSpanOrigin());
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
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			open={open}
			onClose={handleClose}
			message="Origin is marked"
			action={
				<Button color="secondary" size="small" onClick={handleDismiss}>
					UNMARK
				</Button>
			}
		/>
	);
};
