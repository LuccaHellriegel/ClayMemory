export function spanToWordRanges(span: HTMLSpanElement) {
	const result: Range[] = [];
	const textNode = span.childNodes[0];
	const textContent = span.textContent;

	if (textContent) {
		const possiblyWords = textContent.split(" ");
		console.log(possiblyWords, textContent);

		let startOffset = 0;
		let endOffset = 0;

		for (const word of possiblyWords) {
			if (word.length >= 1) {
				endOffset += word.length;

				if (result.length > 0) endOffset += 1;

				let range = document.createRange();

				range.setStart(textNode, startOffset);
				range.setEnd(textNode, endOffset);

				result.push(range);

				startOffset += word.length + 1;
			} else {
				startOffset += 1;
				endOffset += 1;
			}
		}
	}

	return result;
}
