export function findSectionSpans(spanNode: any) {
	//TODO: assumes all spans in section have the same height, might need recursion or collecting all different heights?
	const rect = spanNode.getBoundingClientRect();
	const spanHeight = rect.bottom - rect.y;

	const spans = [spanNode];

	let add = spanHeight * 1.5;
	let remove = spanHeight / 2;

	let tempSpanNode = null;

	let expand = true;
	let spansLength = spans.length;
	while (expand) {
		//TODO: optimization of temp selection
		tempSpanNode = document.elementFromPoint(rect.x, rect.y - remove);
		if (tempSpanNode?.nodeName === "SPAN") {
			spans.unshift(tempSpanNode);
			remove += spanHeight;
		} else {
			console.log(tempSpanNode);
		}

		tempSpanNode = document.elementFromPoint(rect.x, rect.y + add);
		if (tempSpanNode?.nodeName === "SPAN") {
			spans.push(tempSpanNode);
			add += spanHeight;
		} else {
			console.log(tempSpanNode);
		}

		if (spansLength === spans.length) {
			expand = false;
		} else {
			spansLength = spans.length;
		}
	}

	return spans;
}
