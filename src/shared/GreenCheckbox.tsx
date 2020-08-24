import { withStyles, CheckboxProps, Checkbox } from "@material-ui/core";
import React from "react";
import { green } from "@material-ui/core/colors";
export const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600],
		},
	},
	checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
