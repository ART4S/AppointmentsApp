import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Container,
  Tooltip,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";
import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import useLocalization from "common/hooks/useLocalization";
import Accordion from "./components/Accordion/Accordion";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";
import { selectError } from "./components/AppointmentsTable/appointmentsTableSlice";

const SPACING = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
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
  const l = useLocalization();

  function renderFilterButton() {
    return (
      <Tooltip title={l("appointments.common.filters")}>
        <IconButton className={classes.icon}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <div className={classes.root}>
      <Header title={l("appointments.common.page")} Icon={AppointmentIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <Accordion header={renderFilterButton()}>
              <AppointmentsFilters />
            </Accordion>
          </Grid>

          <Grid item xs>
            <AppointmentsTable />
          </Grid>
        </Grid>
      </Container>

      {error && <ErrorPopup text={l("errors.loadData")} />}
    </div>
  );
}
