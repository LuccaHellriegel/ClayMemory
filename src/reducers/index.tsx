const ELE_SIZE = "ELE_SIZE";

export function eleSize(size: { width: number; height: number }) {
	return { size, type: ELE_SIZE };
}

const CONTAINER_WIDTH = "CONTAINER_WIDTH";

export function containerWidth(width: number) {
	return { width, type: CONTAINER_WIDTH };
}

const COLS = "COLS";

export function cols(colAmount: number) {
	return { colAmount, type: COLS };
}

const FILE = "FILE";

export function file(file: File) {
	return { file, type: FILE };
}

const initialState = {
	should: 0,
	ContainerWidth: 1200,
	Cols: 12,
	RowHeight: 30,
	file: null,
	EleSizeUnits: { width: null, height: null },
};

const pxToWidth = (px: number, containerWidth: number, cols: number) => Math.round(px / (containerWidth / cols));
const pxToHeight = (px: number, rowHeight: number) => Math.round(px / rowHeight);

const sizeReducer = (state: any, action: any) => {
	//if (state.should < 1) return state;

	const unitWidth = pxToWidth(action.size.width, state.ContainerWidth, state.Cols);
	const unitHeight = pxToHeight(action.size.height, state.RowHeight);

	if (state.EleSizeUnits && state.EleSizeUnits.width === unitWidth && state.EleSizeUnits.heigth === unitHeight) {
		console.log("Same!");
		return state;
	}

	return {
		...state,
		should: state.should + 1,
		EleSize: action.size,
		EleSizeUnits: {
			width: unitWidth,
			height: unitHeight,
		},
	};
};

export function gridReducer(state = initialState, action: any) {
	switch (action.type) {
		case ELE_SIZE:
			return sizeReducer(state, action);
		case CONTAINER_WIDTH:
			return { ...state, ContainerWidth: action.width };
		case COLS:
			return { ...state, Cols: action.colAmount };
		case FILE:
			return { ...state, file: action.file };
		default:
			return state;
	}
}
