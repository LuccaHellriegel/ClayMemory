import { SpanDataGroups, getSpanDataGroups } from "../../services/SpanService";
import { Dispatch } from "redux";

export const PDF_LOADED = "PDF_LOADED";

export const pdfLoaded = (numPages: number) => {
	return { type: PDF_LOADED, numPages };
};

export const numPages = (state = null, { type, numPages }: { type: string; numPages?: number }) => {
	switch (type) {
		case PDF_LOADED:
			return numPages;
		default:
			return state;
	}
};

export const PAGE_DATA = "PAGE_DATA";

export type PageDataStatus = { time: number };
export type PageDataType = SpanDataGroups & PageDataStatus;

export function pageDataAction(pageData: PageDataType) {
	return { type: PAGE_DATA, pageData };
}

// from MutationObserver experiments,
// we know that the text-layer is not guaranteed to be rendered on render "success",
// so we use this ugly "try ten times" approach
export function pageDataActionAsync(container: HTMLDivElement) {
	return (dispatch: Dispatch) => {
		const startTime = Date.now();

		let counter = 0;

		const increment = () => {
			const curCounter = counter;
			counter++;
			return curCounter;
		};

		// TODO: still possibility of race-condition,
		// maybe check on each section update if the number is congruent and if not actualize?
		// TODO: make fluid movement for changing from non-existing section on new page to existing one

		const giveUpCondition = 10;

		const timeout = setInterval(() => {
			if (increment() > giveUpCondition) {
				clearInterval(timeout);
				return;
			}

			const dataGroups = getSpanDataGroups(container);
			if (dataGroups) {
				clearInterval(timeout);
				dispatch(pageDataAction({ ...dataGroups, time: startTime }));
			}
		}, 20);
	};
}

export const pageData = (
	state = { time: -Infinity },
	{ type, pageData }: { type: string; pageData: PageDataType }
): PageDataType | { time: number } => {
	switch (type) {
		case PAGE_DATA:
			const dataIsNewer = pageData.time > state.time;
			if (dataIsNewer) return pageData;
			return state;
		default:
			return state;
	}
};
