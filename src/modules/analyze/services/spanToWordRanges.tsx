export const splitSpanContentIntoWords = (textContent: string) => textContent.split(" ");

export function spanToWordRanges(span: HTMLSpanElement) {
	const result: Range[] = [];

	//node is needed for Range object
	const textNode = span.childNodes[0];
	const textContent = span.textContent;

	if (textContent) {
		const possiblyWords = splitSpanContentIntoWords(textContent);

		//to create the Range objects we need the correct offset, otherwise it would be more straightforward parsing
		let startOffset = 0;
		let endOffset = 0;

		for (const word of possiblyWords) {
			const moreThanEmptySpace = word.length >= 1;
			if (moreThanEmptySpace) {
				endOffset += word.length;

				const firstRange = result.length > 0;
				// offset is >= 1 because we split at " " and not ""
				if (firstRange) endOffset += 1;

				const range = document.createRange();

				range.setStart(textNode, startOffset);
				range.setEnd(textNode, endOffset);

				result.push(range);

				startOffset += word.length + 1;
			} else {
				// if empty space, this means str started with empty space or ended with it, so need to move forward
				startOffset += 1;
				endOffset += 1;
			}
		}
	}

	return result;
}
