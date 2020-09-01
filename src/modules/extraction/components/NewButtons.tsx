import { Fragment } from "react";
import { MenuItem } from "@material-ui/core";
import React from "react";

//TODO-NICE: clear qa-field button

const NewQACardQ = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q (Q-A)</MenuItem>;
const NewQACardA = ({ onClick }: any) => <MenuItem onClick={onClick}>New: A (Q-A)</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

export const NewButtons = ({ noteDispatch, qDispatch, aDispatch }: any) => {
	return (
		<Fragment>
			<NewNoteCard onClick={noteDispatch}></NewNoteCard>
			<NewQACardQ onClick={qDispatch}></NewQACardQ>
			<NewQACardA onClick={aDispatch}></NewQACardA>
		</Fragment>
	);
};
