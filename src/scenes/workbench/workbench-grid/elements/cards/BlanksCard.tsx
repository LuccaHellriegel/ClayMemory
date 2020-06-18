import { connect } from "react-redux";
import { Editor } from "../../../../../components/Editor";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const BlanksCard = () => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2">
					Blanks
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

export const BlanksCardContainer = connect(mapStateToProps, mapDispatchToProps)(BlanksCard);
