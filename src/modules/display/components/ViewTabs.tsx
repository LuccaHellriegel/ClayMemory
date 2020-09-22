import { Card, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../actions";
import { getCurrentView } from "../selectors";

export const ViewTabs = () => {
	const currentView = useSelector(getCurrentView);
	const dispatch = useDispatch();

	const handleChange = (_: any, newValue: number) => {
		dispatch(setView(newValue));
	};

	return (
		<Card>
			<Tabs value={currentView} onChange={handleChange}>
				<Tab label="River-Material" />
				<Tab label="River Explorer" />
				<Tab label="Card Explorer" />
			</Tabs>
		</Card>
	);
};
