function sentenceEndRegEx() {
	// use function to return new regEx object/avoid index errors
	// re needs to be global, otherwise endless loop when using while != null
	//TODO: replace with nlp library?

	return /(\w(\.|!|\?|\.\.\.| \.\.\.)( |$|\n))/g;
}

function firstSentenceEndMatch(spanNode: any) {
	return sentenceEndRegEx().exec(spanNode.textContent);
}

function lastSentenceEndMatch(spanNode: any) {
	const re = sentenceEndRegEx();
	let match;
	let lastMatch;

	while ((match = re.exec(spanNode.textContent)) != null) {
		lastMatch = match;
	}

	return lastMatch;
}

function clickedSpanContainsSentenceEnd(spanNode: any, range: Range) {
	const re = sentenceEndRegEx();
	const startOffset = range.startOffset;
	const str = spanNode.textContent;

	let match;
	while ((match = re.exec(str)) != null) {
		if (match.index + 1 >= startOffset) {
			return match;
		}
	}

	return false;
}

function clickedSpanContainsSentenceStart(spanNode: any, range: Range) {
	const re = sentenceEndRegEx();
	const startOffset = range.startOffset;
	const str = spanNode.textContent;

	let match;
	let lastMatch;

	while ((match = re.exec(str)) != null) {
		if (match.index + 1 <= startOffset) lastMatch = match;
	}

	return lastMatch;
}

export function sentenceText(range: Range, spanNode: any, spans: any[]) {
	const indexOfSpanNode = spans.indexOf(spanNode);

	let resultStartIndex = indexOfSpanNode;
	let resultStartMatch = { index: 0 };

	let resultEndIndex = indexOfSpanNode;
	let resultEndMatch = { index: spanNode.textContent.length - 1 };

	const clickedSpanStart = clickedSpanContainsSentenceStart(spanNode, range);
	if (clickedSpanStart) {
		resultStartMatch = clickedSpanStart;
	} else {
		// clicked line is first line and no end-match: take all
		if (indexOfSpanNode === 0) {
			resultStartMatch = { index: 0 };
		} else {
			let index = indexOfSpanNode - 1;

			while (index >= 0) {
				const match = lastSentenceEndMatch(spans[index]);
				if (match) {
					resultStartMatch = match;
					break;
				} else {
					index--;
				}
			}
			if (index === -1) {
				index = 0;
				// has not found a match: take all
				resultStartMatch = { index: 0 };
			}
			resultStartIndex = index;
		}
	}

	const clickedSpanEnd = clickedSpanContainsSentenceEnd(spanNode, range);
	if (clickedSpanEnd) {
		resultEndMatch = clickedSpanEnd;
	} else {
		// clicked line is last line and no end-match: take all
		if (indexOfSpanNode === spans.length - 1) {
			resultEndMatch = { index: spanNode.textContent.length - 1 };
		} else {
			let index = indexOfSpanNode + 1;

			while (index < spans.length) {
				const match = firstSentenceEndMatch(spans[index]);
				if (match) {
					resultEndMatch = match;
					break;
				} else {
					index--;
				}
			}
			if (index === spans.length) {
				index = spans.length - 1;
				// has not found a match: take all
				resultEndMatch = { index: spanNode.textContent.length - 1 };
			}
			resultEndIndex = index;
		}
	}

	console.log(clickedSpanStart, clickedSpanEnd);

	let result = "";
	console.log(resultStartIndex, resultStartMatch, resultEndIndex, resultEndMatch);
	if (resultEndIndex - resultStartIndex === 0) {
		// single line
		const startIndex = resultStartMatch.index === 0 ? 0 : resultStartMatch.index + 2;
		result = (spanNode.textContent as string).slice(startIndex, resultEndMatch.index + 2);
	} else {
		for (let count = 0; count < resultEndIndex - resultStartIndex + 1; count++) {
			const curIndex = resultStartIndex + count;
			const curSpanNode = spans[curIndex];

			// not necessary to preserve line-breaks for single sentence?
			// if (result !== "") result += "\n";

			if (curIndex === resultStartIndex) {
				// if we start at beginning then no offset
				// it we start in the string, then offset "[some-digit]. " = 2
				const matchIndex = resultStartMatch.index === 0 ? 0 : resultStartMatch.index + 2;
				result += (curSpanNode.textContent as string).slice(matchIndex);
			} else if (curIndex === resultEndIndex) {
				result += (curSpanNode.textContent as string).slice(0, resultEndMatch.index + 2);
			} else {
				result += curSpanNode.textContent;
			}
		}
	}

	return result;
}
