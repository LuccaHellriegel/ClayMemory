import { useRef } from "react";
import JoditEditor from "jodit-react";
import React from "react";

export const Editor = ({ content = "", config = { readonly: false, height: "100%" } }: any) => {
	const editor = useRef(null);
	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={(newContent) => console.log(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>
	);
};
