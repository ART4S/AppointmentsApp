import { Box, makeStyles } from "@material-ui/core";

import Progress from "../Progress/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  screen: {
    backgroundColor: theme.palette.action.disabledBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    zIndex: 0,
  },
}));

export default function BusyScreen({ isBusy, children }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {isBusy && (
        <Box className={classes.screen}>
          <Progress />
        </Box>
      )}
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
}
