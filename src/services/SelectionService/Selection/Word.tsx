function setEndOfWord(textNode: any, range: Range) {
	//move end to right until " " is reached

	//TODO: includes . in word
	try {
		do {
			range.setEnd(textNode, range.endOffset + 1);
		} while (
			range.toString().indexOf(" ") === -1 &&
			range.toString().trim() !== "" &&
			range.endOffset < textNode.length
		);
		return true;
	} catch (e) {
		//console.log(e);
		return false;
	}
}

function setStartOfWord(textNode: any, range: Range) {
	//move start to left until " " is reached
	const emptySpaceNotReached = () => range.toString().indexOf(" ") !== 0;
	const leftEndNotReached = () => range.startOffset > 0;
	while (emptySpaceNotReached() && leftEndNotReached()) {
		range.setStart(textNode, range.startOffset - 1);
	}
	if (leftEndNotReached()) {
		// this means, empty space was reached and we need to move one to the right
		range.setStart(textNode, range.startOffset + 1);
	}
}

export function selectedWord(inputRange: Range, textNode: any) {
	const range = inputRange.cloneRange();
	setStartOfWord(textNode, range);
	setEndOfWord(textNode, range);
	return range.toString().trim();
}
