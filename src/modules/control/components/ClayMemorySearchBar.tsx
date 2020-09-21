import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import river from "../../river";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Select } from "@material-ui/core";
import display from "../../display";

//TODO-NICE: react-pdf alignment is broken for some pdfs and generally for non-body text,
// seems to be connected to choosing the wrong font
// font is chosen per page not per item (e.g. body-font for heading/cursive)
// needs to be fixed before making search
// otherwise coloring findings not possible / good enough

//TODO-NICE: make search for PDF (right now this would need some work to find the correct text-node and partially color it)
// https://github.com/wojtekmaj/react-pdf/issues/212
// counter of found words
// count also in PDF
// PDFPageProxy
// getTextContent
// if not rendered
// count via Proxy
// if rendered count via CustomRenderer
// two dicts to hold which one
// make window with next/last found
// current renderer: multiline matches is not support / matches that cross textItems
// strg +f should jump to the searchbox? Only if I replace the search fully
// upper / lower case

export const ClayMemorySearchBar = () => {
	const dispatch = useDispatch();

	const contentString = useSelector(river.selectors.getRiverContentFilter);

	const [state, setState] = useState(contentString);

	const [searchFocus, setSearchFocus] = useState("cards");

	const onChangeCards = (newValue: string) => {
		// auto-reset on empty
		if (newValue === "") dispatch(river.actions.resetContentFilter());
		setState(newValue);
	};
	const onCancelSearchCards = () => {
		dispatch(river.actions.resetContentFilter());
	};
	const onRequestSearchCards = () => dispatch(river.actions.setContentFilter(state));

	const onChangeDocument = (newValue: string) => {
		// auto-reset on empty
		if (newValue === "") dispatch(display.actions.resetDocumentSearch());
		setState(newValue);
	};
	const onCancelSearchDocument = () => {
		dispatch(display.actions.resetDocumentSearch());
	};
	const onRequestSearchDocument = () => dispatch(display.actions.setDocumentSearch(state));

	const onChange = searchFocus === "cards" ? onChangeCards : onChangeDocument;
	const onCancelSearch = searchFocus === "cards" ? onCancelSearchCards : onCancelSearchDocument;
	const onRequestSearch = searchFocus === "cards" ? onRequestSearchCards : onRequestSearchDocument;

	const chooseFocus = (chosenFocus: string) => {
		setSearchFocus(chosenFocus);
		if (chosenFocus === "cards") {
			onCancelSearchDocument();
		} else {
			onCancelSearchCards();
		}
		setState("");
	};

	//TODO-NICE: search in other rivers/same river when composing to show similar cards (like in the Anki Addon)
	//TODO-NICE: change the color / border or something to indicate when a filter is active
	return (
		<Grid container direction="row" alignItems="center" spacing={1}>
			<Grid item>
				<Select
					variant="outlined"
					color="secondary"
					native
					value={searchFocus === "cards" ? "Filter cards" : "Search document"}
					onChange={(
						event: React.ChangeEvent<{
							name?: string | undefined;
							value: unknown;
						}>
					) => {
						chooseFocus(event.target.value === "Search document" ? "document" : "cards");
					}}
				>
					<option>Filter cards</option>
					<option>Search document</option>
				</Select>
			</Grid>
			<Grid item>
				<SearchBar
					value={state}
					placeholder={searchFocus === "cards" ? "Filter cards" : "Search document"}
					onChange={onChange}
					onCancelSearch={onCancelSearch}
					onRequestSearch={onRequestSearch}
					cancelOnEscape={true}
				/>
			</Grid>
		</Grid>
	);
};