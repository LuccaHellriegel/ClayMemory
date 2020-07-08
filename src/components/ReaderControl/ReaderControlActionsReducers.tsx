export const PAGE_UPDATE = "PAGE_UPDATE";

export const nextPage = (curPage: number, numbPages: number) => {
	let newPage = curPage + 1;
	if (newPage === numbPages + 1) newPage = 0;
	return { type: PAGE_UPDATE, page: newPage };
};

export const previousPage = (curPage: number, numbPages: number) => {
	let newPage = curPage - 1;
	if (newPage === 0) newPage = numbPages;
	return { type: PAGE_UPDATE, page: newPage };
};

export const page = (state = 1, { type, page }: { type: string; page?: number }) => {
	switch (type) {
		case PAGE_UPDATE:
			return page;
		default:
			return state;
	}
};
