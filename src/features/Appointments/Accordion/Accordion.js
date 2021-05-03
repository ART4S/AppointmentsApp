import { useState } from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  summary: {
    backgroundColor: theme.palette.primary.light,
    height: 10,
  },
}));

export default function Accordion({ header, children }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  return (
    <MuiAccordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <MuiAccordionSummary className={classes.summary}>
        {header}
      </MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}
