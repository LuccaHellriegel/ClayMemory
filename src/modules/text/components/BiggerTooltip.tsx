import { Tooltip, withStyles } from "@material-ui/core";

export const BiggerTooltip = withStyles((theme: any) => ({
	tooltip: {
		fontSize: 14,
	},
}))(Tooltip);
