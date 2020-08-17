import { Fragment } from "react";
import { MenuItem } from "@material-ui/core";
import React from "react";

//TODO-RC: clear qa-field button

const NewQACardQ = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q (Q-A)</MenuItem>;
const NewQACardA = ({ onClick }: any) => <MenuItem onClick={onClick}>New: A (Q-A)</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

export const NewButtons = ({ noteClick, qClick, aClick }: any) => {
	return (
		<Fragment>
			<NewNoteCard onClick={noteClick}></NewNoteCard>
			<NewQACardQ> onClick={qClick}</NewQACardQ>
			<NewQACardA> onClick={aClick}</NewQACardA>
		</Fragment>
	);
};
