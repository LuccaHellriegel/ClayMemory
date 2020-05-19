import React from "react";
import "./App.css";

type GridSlotElementProps = {
	content: any;
};

function GridSlotElement(props: GridSlotElementProps) {
	return <div className="GridSlotElement">{props.content}</div>;
}

type GridColumnSlotProps = {
	elements: GridSlotElementProps[];
};

function GridColumnSlot(props: GridColumnSlotProps) {
	const elements = props.elements.map((element) => <GridSlotElement content={element.content}></GridSlotElement>);

	return <div className="GridColumnSlot">{elements}</div>;
}

type GridColumnProps = {
	slots: GridColumnSlotProps[];
};

function GridColumn(props: GridColumnProps) {
	const slots = props.slots.map((slot) => <GridColumnSlot elements={slot.elements}></GridColumnSlot>);

	return <div className="GridColumn">{slots}</div>;
}

type GridLayoutProps = { columns: GridColumnProps[] };

function GridLayout(props: GridLayoutProps) {
	const columns = props.columns.map((column) => <GridColumn slots={column.slots}></GridColumn>);

	return <div className="GridLayout">{columns}</div>;
}

function App() {
	const gridColumnProps = {
		slots: [{ elements: [{ content: "A" }, { content: "A" }] }, { elements: [{ content: "A" }] }],
	};
	const gridLayoutProps = { columns: [gridColumnProps, gridColumnProps] };
	return GridLayout(gridLayoutProps);
}

export default App;
