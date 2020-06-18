import { useRef } from "react";
import JoditEditor from "jodit-react";
import React from "react";

export const Editor = ({
	content = "",
	config = { readonly: false, width: "100%" },
	onBlur = (newContent: any) => console.log(newContent),
}: any) => {
	const editor = useRef(null);
	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
		/>
	);
};
