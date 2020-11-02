import { Snackbar, IconButton } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

export function SimpleSnackbar({ message, close }: { message: string; close: () => void }) {
	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		close();
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			open={true}
			autoHideDuration={4000}
			onClose={handleClose}
			message={message}
			action={
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	);
}
