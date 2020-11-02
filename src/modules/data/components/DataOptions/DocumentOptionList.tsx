import { useSelector } from "react-redux";
import React from "react";
import { Typography } from "@material-ui/core";
import pdf from "../../../pdf";
import text from "../../../text";
import { incrementer } from "../../../../shared/utils";
import { getDocumentNames } from "../../selectors";
import { DocumentOptionItem } from "./DocumentOptionItem";

export const DocumentOptionList = ({ afterClick }: { afterClick: () => void }) => {
	const activeDocument = useSelector(pdf.selectors.getPDFName);
	const documents = useSelector(getDocumentNames)
		.filter((doc) => doc !== activeDocument)
		.sort();
	const increment = incrementer();

	return (
		<span>
			{documents.length > 0 && [
				<Typography key={increment()} component={"span"} variant="h6">
					{text.constants.existingDataText}
				</Typography>,
				<Typography key={increment()} component={"span"}>
					<ul style={{ listStyleType: "square" }}>
						{documents.map((document) =>
							document ? (
								<li key={increment()}>
									<DocumentOptionItem
										document={document}
										afterClick={afterClick}
										key={increment()}
									></DocumentOptionItem>
								</li>
							) : null
						)}
					</ul>
				</Typography>,
			]}
		</span>
	);
};
