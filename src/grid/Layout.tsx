import "./Layout.css";
import "./css/grid-styles.css";
import "./css/resizable-styles.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import React from "react";
import { PDFMaterialContainer } from "./PDFMaterial";
import { cols, containerWidth } from "../reducers";
import { connect } from "react-redux";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Layout({
	onWidthChange,
	gridWidth = null,
}: {
	onWidthChange: (
		layoutContainerWidth: number,
		margin: [number, number],
		layoutCols: number,
		containerPadding: [number, number]
	) => void;
	gridWidth: any;
}) {
	return (
		<ResponsiveReactGridLayout className="layout" rowHeight={30} onWidthChange={onWidthChange}>
			<div className="LayoutElement" key="a" data-grid={{ x: 0, y: 0, w: 1, h: 1 }}>
				<PDFMaterialContainer></PDFMaterialContainer>
			</div>
			<div className="LayoutElement" key="b" data-grid={{ x: 0, y: 0, w: 3, h: 2 }}></div>
		</ResponsiveReactGridLayout>
	);
}

function mapStateToProps(state: any) {
	//return {};
	return { gridWidth: state.EleSizeUnits.width };
}

function mapDispatchToProps(dispatch: any) {
	return {
		onWidthChange: (
			layoutContainerWidth: number,
			margin: [number, number],
			layoutCols: number,
			containerPadding: [number, number]
		) => {
			dispatch(cols(layoutCols));
			dispatch(containerWidth(layoutContainerWidth));
		},
	};
}

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);
