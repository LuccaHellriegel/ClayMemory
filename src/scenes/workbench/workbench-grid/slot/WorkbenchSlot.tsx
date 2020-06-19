import React from "react";
import Grid from "@material-ui/core/Grid";

export const WorkbenchSlot = ({
	children,
	slotsPerRow = 2,
	slotsPerColumn = 1,
}: {
	children: any;
	slotsPerRow?: number;
	slotsPerColumn?: number;
}) => {
	//default is 2 slots per Row, 1 per column (2x2 grid)
	const height = 100 / slotsPerColumn + "%";
	const width = 100 / slotsPerRow + "%";

	return (
		<Grid
			item
			container
			className="WorkbenchSlot"
			style={{ height, width }}
			direction="row"
			justify="flex-start"
			alignItems="stretch"
		>
			{children}
		</Grid>
	);
};
