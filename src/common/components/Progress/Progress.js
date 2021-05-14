import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

export default function Progress() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress />
    </Box>
  );
}
