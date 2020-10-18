import React from "react";
import { useDispatch } from "react-redux";
import { downloadDBData } from "../actions";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";
import text from "../../text";

export const DownloadDBDataButton = () => {
	const dispatch = useDispatch();

	return (
		<span
			onClick={() => {
				dispatch(downloadDBData());
			}}
		>
			<Button variant="contained" color="primary" disableElevation startIcon={<GetAppIcon></GetAppIcon>}>
				{text.constants.downloadDatasetsText}
			</Button>
		</span>
	);
};
