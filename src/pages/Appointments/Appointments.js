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

import { selectError } from "./components/AppointmentsTable/appointmentsTableSlice";

const APPOINTMENTS = "Приемы";
const FILTERS = "Фильтры";
const ERROR = "Ошибка";
const ERROR_LOAD_DATA =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

const useAccordionStyles = makeStyles((theme) => ({
  summary: {
    backgroundColor: theme.palette.primary.main,
    height: 10,
  },
  details: {
    padding: 0,
  },
}));

function Accordion({ header, children }) {
  const classes = useAccordionStyles();

  return (
    <MuiAccordion defaultExpanded>
      <AccordionSummary className={classes.summary}>{header}</AccordionSummary>
      <AccordionDetails className={classes.details}>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
}

const SPACING = 2;

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: theme.spacing(SPACING),
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export default function Appointments() {
  const classes = useStyles();
  const error = useSelector(selectError);

  function renderFilterButton() {
    return (
      <Tooltip title={FILTERS}>
        <IconButton className={classes.icon}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Box minWidth="md">
      <Header title={APPOINTMENTS} Icon={AppointmentIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item>
            <Accordion header={renderFilterButton()}>
              <AppointmentsFilters />
            </Accordion>
          </Grid>

          <Grid item xs>
            <AppointmentsTable />
          </Grid>
        </Grid>
      </Container>

      {error && (
        <ErrorPopup title={ERROR} text={ERROR_LOAD_DATA} closeDelay={3000} />
      )}
    </Box>
  );
}
