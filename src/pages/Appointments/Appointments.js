import {
  Box,
  Container,
  Tooltip,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import Header from "common/components/Header/Header";

import AppointmentsAccordion from "./components/AppointmentsAccordion/AppointmentsAccordion";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";

import AppointmentsErrorDialog from "./components/AppointmentsErrorDialog/AppointmentsErrorDialog";

const useStyles = makeStyles((theme) => ({
  root: {},

  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    maxWidth: 800,
    margin: "auto",
  },
}));

export default function Appointments() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header title="Приемы" Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <AppointmentsAccordion
            header={
              <Tooltip title="Filters">
                <IconButton aria-label="filters">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <AppointmentsFilters />
          </AppointmentsAccordion>
        </Box>

        <Box mt={5}>
          <AppointmentsTable />
        </Box>
      </Container>

      <AppointmentsErrorDialog />
    </Box>
  );
}
