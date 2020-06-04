import { connect } from "react-redux";
import { Editor } from "../../../../components/Editor";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const Note = () => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					Note
				</Typography>
				<Editor></Editor>
			</CardContent>
		</Card>
	);
};

function mapStateToProps(state: any) {
	return { content: state.Selection };
}

function mapDispatchToProps(dispatch: any) {
	return {};
}

export const NoteContainer = connect(mapStateToProps, mapDispatchToProps)(Note);
