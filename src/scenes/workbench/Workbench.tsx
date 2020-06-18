import React from "react";
import { ExtractionBracketContainer } from "./extraction-menu/bracket/ExtractionBracketContainer";
import { WorkbenchGridContainer } from "./workbench-grid/WorkbenchGridContainer";
import { ExtractionMenuContainer } from "./extraction-menu/menu/ExtractionMenuContainer";

export function Workbench() {
	return (
		<div>
			<ExtractionBracketContainer>
				<WorkbenchGridContainer></WorkbenchGridContainer>
			</ExtractionBracketContainer>
			<ExtractionMenuContainer></ExtractionMenuContainer>
		</div>
	);
}
