import React from "react";
import Grid from "@material-ui/core/Grid";
import { ReaderContainer } from "./Reader/Reader";
import { withSize } from "react-sizeme";

function ReaderSceneGridColumn({ children }: any) {
	return (
		<Grid
			item
			style={{
				height: "100%",
				outline: "solid red",
				//overflowY: "scroll",
				//overflowX: "scroll",
			}}
		>
			{children}
		</Grid>
	);
}

function ReaderSceneMaterialColumn({ size }: any) {
	console.log(size);
	return (
		<Grid
			item
			style={{
				width: "60%",
				//height: "100%",
				outline: "solid red",
				// overflowY: "scroll",
				// overflowX: "scroll",
			}}
		>
			<ReaderContainer parentSize={size}></ReaderContainer>
		</Grid>
	);
}

const ReaderSceneMaterialColumnWithSize = withSize({ monitorHeight: true, noPlaceholder: true })(
	ReaderSceneMaterialColumn
);

export function ReaderScene() {
	return (
		<Grid container justify="space-around" direction="row">
			<ReaderSceneGridColumn>Bluä</ReaderSceneGridColumn>
			<ReaderSceneMaterialColumnWithSize></ReaderSceneMaterialColumnWithSize>
			<ReaderSceneGridColumn>Bluä</ReaderSceneGridColumn>
		</Grid>
	);
}
