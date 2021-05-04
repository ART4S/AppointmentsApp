import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.light,
    height: 10,
  },
}));

export default function AppointmentsAccordion({ header, children }) {
  const classes = useStyles();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary className={classes.header}>{header}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
