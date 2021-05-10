import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Container,
  Tooltip,
  IconButton,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";

import { selectAppointmentsError } from "./components/AppointmentsTable/appointmentsTableSlice";

const APPOINTMENTS = "Приемы";
const FILTERS = "Фильтры";
const ERROR = "Ошибка";
const ERROR_LOAD_DATA =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

const useAccodtionStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
  },
  box: {
    minWidth: 50,
    minHeight: 50,
    backgroundColor: theme.palette.primary.main,
    border: "2px dotted",
  },
}));

function Accordion({ header, children }) {
  const classes = useAccodtionStyles();

  return (
    <MuiAccordion defaultExpanded>
      <AccordionSummary className={classes.header}>{header}</AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
}

function Block() {
  const classes = useAccodtionStyles();
  return <Box className={classes.box} />;
}

const spacing = 2;

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: theme.spacing(spacing),
  },
}));

export default function Appointments() {
  const classes = useStyles();
  const hasError = useSelector(selectAppointmentsError);

  return (
    <Box>
      <Header title={APPOINTMENTS} Icon={AppointmentIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={spacing}>
          <Grid item>
            <Accordion
              header={
                <Tooltip title={FILTERS}>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <AppointmentsFilters />
            </Accordion>
          </Grid>

          <Grid item>
            <AppointmentsTable />
          </Grid>
        </Grid>
      </Container>

      {hasError && (
        <ErrorPopup title={ERROR} text={ERROR_LOAD_DATA} closeDelay={3000} />
      )}
    </Box>
  );
}
