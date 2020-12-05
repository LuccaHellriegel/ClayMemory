import React from "react";
import { useDispatch } from "react-redux";
import { downloadActiveData } from "../../actions";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";
import text from "../../../text";

export const DownloadActiveDataButton = () => {
	const dispatch = useDispatch();

	return (
		<span
			onClick={() => {
				dispatch(downloadActiveData());
			}}
		>
			<Button variant="contained" color="primary" disableElevation startIcon={<GetAppIcon></GetAppIcon>}>
				{text.constants.downloadActiveCardsText}
			</Button>
		</span>
	);
};
