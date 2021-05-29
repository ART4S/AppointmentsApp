import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Progress(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress color="secondary" {...props} />
    </Box>
  );
}
