import { connect } from "react-redux";
import { Editor } from "../../../../components/Editor";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function mapStateToProps(state: any) {
	return { content: state.Selection };
}

function mapDispatchToProps(dispatch: any) {
	return {};
}

const QACard = () => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="h2" style={{ height: "10%" }}>
					Question
				</Typography>
				<Editor config={{ readonly: false, height: "40%" }}></Editor>
				<Typography variant="h5" component="h2" style={{ height: "10%" }}>
					Answer
				</Typography>
				<Editor config={{ readonly: false, height: "40%" }}></Editor>
			</CardContent>
		</Card>
	);
};

export const QACardContainer = connect(mapStateToProps, mapDispatchToProps)(QACard);
