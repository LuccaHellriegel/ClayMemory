import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import river from "../../river";
import { useDispatch, useSelector } from "react-redux";

//TODO-RC: make search for PDF (right now this would need some work to find the correct text-node and partially color it)
// https://github.com/wojtekmaj/react-pdf/issues/212
export const CardSearchBar = () => {
	const dispatch = useDispatch();
	const contentFilter = useSelector(river.selectors.getRiverContentFilter);
	const [state, setState] = useState(contentFilter);

	//TODO-NICE: search in other rivers/same river when composing to show similar cards (like in the Anki Addon)
	//TODO-NICE: change the color / border or something to indicate when a filter is active
	return (
		<SearchBar
			value={state}
			placeholder="Search in cards"
			onChange={(newValue) => {
				// auto-reset on empty
				if (newValue === "") dispatch(river.actions.resetContentFilter());
				setState(newValue);
			}}
			onCancelSearch={() => {
				dispatch(river.actions.resetContentFilter());
			}}
			onRequestSearch={() => dispatch(river.actions.setContentFilter(state))}
		/>
	);
};
