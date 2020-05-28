import "./Layout.css";
import React from "react";
import { PDFMaterialContainer } from "../PDF/PDFMaterial";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Editor } from "../Editor/Editor";

function Layout() {
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item>
					<div className="LayoutElement">
						<Editor></Editor>
					</div>
				</Grid>
				<Grid item>
					<div className="LayoutElement">
						<PDFMaterialContainer></PDFMaterialContainer>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

function mapStateToProps(state: any) {
	return {};
}

function mapDispatchToProps(dispatch: any) {
	return {};
}

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);
