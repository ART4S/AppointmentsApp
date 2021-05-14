import { Box, makeStyles } from "@material-ui/core";

import Progress from "../Progress/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.disabledBackground,
    zIndex: theme.zIndex.tooltip,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
}));

export default function BusyScreen({ isBusy }) {
  const classes = useStyles();
  return (
    isBusy && (
      <Box className={classes.root}>
        <Progress />
      </Box>
    )
  );
}
