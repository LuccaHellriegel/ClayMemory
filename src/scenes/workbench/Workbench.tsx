import React from "react";
import { ExtractionBracketContainer } from "../../components/ExtractionMenu/bracket/ExtractionBracketContainer";
import { WorkbenchGridContainer } from "./workbench-grid/WorkbenchGridContainer";
import { ExtractionMenuContainer } from "../../components/ExtractionMenu/menu/ExtractionMenuContainer";

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
