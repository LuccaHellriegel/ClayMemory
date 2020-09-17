import { Fragment } from "react";
import { MenuItem, Divider } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { dispatchCreationFromContextMenu } from "../actions";

const NewQACardQ = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Q (Q-A)</MenuItem>;
const NewQACardA = ({ onClick }: any) => <MenuItem onClick={onClick}>New: A (Q-A)</MenuItem>;
const NewNoteCard = ({ onClick }: any) => <MenuItem onClick={onClick}>New: Note</MenuItem>;

export const NewButtons = () => {
	const dispatch = useDispatch();

	return (
		<Fragment>
			<NewNoteCard
				onClick={() => {
					dispatch(dispatchCreationFromContextMenu("note"));
				}}
			></NewNoteCard>
			<Divider></Divider>
			<NewQACardQ
				onClick={() => {
					dispatch(dispatchCreationFromContextMenu("q"));
				}}
			></NewQACardQ>
			<NewQACardA
				onClick={() => {
					dispatch(dispatchCreationFromContextMenu("a"));
				}}
			></NewQACardA>
		</Fragment>
	);
};
