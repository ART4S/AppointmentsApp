import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

export default function Progress() {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
