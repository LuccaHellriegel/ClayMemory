import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";

export const Editor = ({}) => {
	const editor = useRef(null);
	const [content, setContent] = useState("");

	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/
		height: 200,
		width: 200,
	};

	//tabIndex={1} // tabIndex of textarea
	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>
	);
};
