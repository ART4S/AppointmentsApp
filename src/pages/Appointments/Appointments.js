import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Container,
  Tooltip,
  IconButton,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";
import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import RouterLink from "common/components/RouterLink/RouterLink";
import useLocalization from "common/hooks/useLocalization";
import Accordion from "./components/Accordion/Accordion";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";
import { selectError } from "./components/AppointmentsTable/appointmentsTableSlice";

const SPACING = 2;

function Breadcrumbs() {
  const l = useLocalization();

  return (
    <MuiBreadcrumbs>
      <RouterLink to="/">
        <Typography color="textSecondary">
          {l("appointments.common.home")}
        </Typography>
      </RouterLink>

      <Typography color="textPrimary" style={{ cursor: "default" }}>
        {l("appointments.common.page")}
      </Typography>
    </MuiBreadcrumbs>
  );
}

function FilterIcon() {
  const l = useLocalization();
  const theme = useTheme();

  return (
    <Tooltip title={l("appointments.common.filters")}>
      <IconButton style={{ color: theme.palette.common.white }}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );
}

function Filters() {
  return (
    <Accordion header={<FilterIcon />}>
      <AppointmentsFilters />
    </Accordion>
  );
}

const useAppointmentsStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  body: {
    marginTop: theme.spacing(SPACING),
  },
}));

export default function Appointments() {
  const classes = useAppointmentsStyles();
  const error = useSelector(selectError);
  const l = useLocalization();

  return (
    <div className={classes.root}>
      <Header title={l("appointments.common.page")} Icon={AppointmentIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <Breadcrumbs />
          </Grid>

          <Grid item xs>
            <Filters />
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
