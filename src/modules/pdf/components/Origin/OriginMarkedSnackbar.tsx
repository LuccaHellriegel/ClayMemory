import { Button, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpanOrigin } from "../../selectors";
import { actions } from "../../slice";

//TODO: think about that SelectionSnackbar and this both are dismissed via Esc

export const OriginMarkedSnackbar = () => {
	const [open, setOpen] = useState(false);
	const spanOrigin = useSelector(getSpanOrigin);
	const dispatch = useDispatch();

	if (!!!spanOrigin && open) setOpen(false);

	if (!!spanOrigin && !open) setOpen(true);

	const handleClose = (event: any, reason: string) => {
		if (reason === "clickaway") {
			return;
		} else {
			setOpen(false);
			dispatch(actions.spanOrigin(null));
		}
	};

	const handleDismiss = () => {
		setOpen(false);
		dispatch(actions.spanOrigin(null));
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

	//TODO: if scrolling wildly accross the document this automatically unmarks, but it should not
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
