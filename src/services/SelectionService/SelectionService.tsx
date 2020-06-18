import { sentenceText } from "./Selection/Sentence";
import { findSectionSpans } from "./Selection/Section";
import { selectedWord } from "./Selection/Word";

function textWasSelected(textNode: any, spanNode: any) {
	if (textNode.nodeName !== "#text") return false;

	// pdf is rendered as spans for each text-line
	if (spanNode.nodeName !== "SPAN") return false;

	return true;
}

export function selectionTextData(s: Selection) {
	const textNode: any = s.anchorNode;
	const spanNode: any = textNode ? textNode.parentNode : null;

	if (!textNode || !spanNode || !textWasSelected(textNode, spanNode)) return null;

	const range: Range = s.getRangeAt(0);

	const spans = findSectionSpans(spanNode);
	const sentence = sentenceText(range, spanNode, spans);
	const word = selectedWord(range, textNode);

	return { spans, sentence, word };
}
