import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import river from "../../river";
import { useDispatch, useSelector } from "react-redux";

//TODO-NICE: make search for PDF
export const CardSearchBar = () => {
	const dispatch = useDispatch();
	const contentFilter = useSelector(river.selectors.getRiverContentFilter);
	const [state, setState] = useState(contentFilter);

	//TODO-NICE: search in other rivers/same river when composing to show similar cards (like in the Anki Addon)
	//TODO-NICE: change the color / border or something to indicate when a filter is active
	return (
		<SearchBar
			value={state}
			onChange={(newValue) => {
				// reset on delete
				if (newValue === "") dispatch(river.actions.setContentFilter(""));
				setState(newValue);
			}}
			onCancelSearch={() => {
				dispatch(river.actions.setContentFilter(""));
			}}
			onRequestSearch={() => dispatch(river.actions.setContentFilter(state))}
		/>
	);
};
