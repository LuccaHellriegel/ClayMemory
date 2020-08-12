"use strict";

import { sortExpandedSpansAccordingToY, sortExpandedSpansAccordingToX } from "./span";

test("x-axis span sorting works with different sized letter-spans", () => {
	// span position data is inspired by 99bottles_milk_js Page 4
	// Layout is:
	// "Names"
	// nearly each letter is a single span and each second letter is a bigger span than the first one
	// so the sorting according to just y-axis would be [a,es,N,m] but we want [N,a,m,es]

	const rectData = [
		{
			x: 538.171875,
			y: 289.7242736816406,
			width: 10.98724365234375,
			height: 19.4375,
			top: 289.7242736816406,
			right: 549.1591186523438,
			bottom: 309.1617736816406,
			left: 538.171875,
		},
		{
			x: 565.359375,
			y: 289.7242736816406,
			width: 17.9136962890625,
			height: 19.4375,
			top: 289.7242736816406,
			right: 583.2730712890625,
			bottom: 309.1617736816406,
			left: 565.359375,
		},
		{
			x: 524.140625,
			y: 295.5331115722656,
			width: 14.040283203125,
			height: 19.4375,
			top: 295.5331115722656,
			right: 538.180908203125,
			bottom: 314.9706115722656,
			left: 524.140625,
		},
		{
			x: 549.15625,
			y: 295.5331115722656,
			width: 16.1988525390625,
			height: 19.4375,
			top: 295.5331115722656,
			right: 565.3551025390625,
			bottom: 314.9706115722656,
			left: 549.15625,
		},
	];

	// need to add span because of ExpandedSpan def
	const a = { span: null, rect: rectData[0] };
	const es = { span: null, rect: rectData[1] };
	const N = { span: null, rect: rectData[2] };
	const m = { span: null, rect: rectData[3] };

	// actual render-order is
	const input = [a, es, N, m];
	const order = sortExpandedSpansAccordingToX(input as any);
	const expectedOrder = [N, a, m, es];

	expect(order.length).toBe(expectedOrder.length);

	for (let index = 0; index < order.length; index++) {
		expect(order[index]).toBe(expectedOrder[index]);
	}
});

test("y-axis span sorting works with page marking", () => {
	// span position data is inspired by 99bottles_milk_js Page 1
	// Page layout is:
	//             topRight (page marking)
	//  middleHigher
	//  middleLower
	//  ...
	//              bottomRight (page marking)
	const topRight = { span: null, rect: { x: 769.381, y: 63.1932, width: 1, bottom: 63.1932 + 1 } };
	const bottomRight = { span: null, rect: { x: 524.323, y: 1321.16, width: 1, bottom: 1321.16 + 1 } };
	const middleHigher = { span: null, rect: { x: 151.754, y: 171.286, width: 1, bottom: 171.286 + 1 } };
	const middleLower = { span: null, rect: { x: 151.754, y: 220.048, width: 1, bottom: 171.286 + 1 } };

	// actual render-order is
	const input = [topRight, bottomRight, middleHigher, middleLower];
	const order = sortExpandedSpansAccordingToY(input as any);
	const expectedOrder = [topRight, middleHigher, middleLower, bottomRight];

	expect(order.length).toBe(expectedOrder.length);

	for (let index = 0; index < order.length; index++) {
		expect(order[index]).toBe(expectedOrder[index]);
	}
});
