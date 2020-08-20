export type QACardField = "q" | "a";
export type CardField = "note" | QACardField;

export type StringCardContent = string;
export type NoteCardContent = StringCardContent;
export type QACardContent = {
	[field in QACardField]: StringCardContent;
};
export type CardContent = NoteCardContent | QACardContent;
