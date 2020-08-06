import { useState } from "react";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import SpeakerNotesTwoToneIcon from "@material-ui/icons/SpeakerNotesTwoTone";
import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { toggleRiverShowState } from "../actions";

export const ShowRiverButton = () => {
	const [outlined, setOutlined] = useState(true);
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(toggleRiverShowState());
				setOutlined(!outlined);
			}}
		>
			{outlined ? (
				<SpeakerNotesOutlinedIcon></SpeakerNotesOutlinedIcon>
			) : (
				<SpeakerNotesTwoToneIcon></SpeakerNotesTwoToneIcon>
			)}
		</IconButton>
	);
};
