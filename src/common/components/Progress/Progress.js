import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
      <CircularProgress {...props} />
    </Box>
  );
}
