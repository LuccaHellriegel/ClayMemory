import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createTransform } from "redux-persist";
import pdf from "./modules/pdf";
import { PDFState } from "./modules/pdf/model";

// to get the correct object with reselect, I added .present to all getAll that belong do undoable modules

const removePDF = (state: any) => {
	return { ...state, pdf: null };
};

const pdfTransform = createTransform(
	(inboundState: PDFState) => {
		return inboundState;
	},
	(outboundState): PDFState => {
		return removePDF(outboundState);
	},
	{ whitelist: [pdf.name] }
);

export const persistConfig = {
	key: "root",
	storage,
	transforms: [pdfTransform],
};
