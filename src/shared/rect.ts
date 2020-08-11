export const rectHeight = (rect: DOMRect) => rect.bottom - rect.y;

const rectsYDist = (rect: DOMRect, rect2: DOMRect) => Math.abs(rect.y - rect2.y);

export const isDistHigherThanFirstHeight = (rect: DOMRect, rect2: DOMRect) => {
	// assumes that the spans are directly beneath each other
	// and that the additional offset between y-left-top of spans (between text) is at most 0.5*height
	const firstHeight = rectHeight(rect);
	return rectsYDist(rect, rect2) > 1.5 * firstHeight;
};
