import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  summary: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
  },
  details: {
    padding: 0,
  },
}));

export default function Accordion({ header, children }) {
  const classes = useStyles();

  return (
    <MuiAccordion defaultExpanded>
      <AccordionSummary className={classes.summary}>{header}</AccordionSummary>
      <AccordionDetails className={classes.details}>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
}
