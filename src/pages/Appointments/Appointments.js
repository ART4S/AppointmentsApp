import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, makeStyles } from "@material-ui/core";
import moment from "moment";

import Header from "components/Header/Header";
import AppointmentsFilter from "components/AppointmentsFilter/AppointmentsFilter";
import AppointmentsAccordion from "components/AppointmentsAccordion/AppointmentsAccordion";
import Table from "components/Table/Table";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import useActions from "hooks/useActions";

import { loadAppointments, selectAllAppointments } from "./appointmentsSlice";

const TITLE = "Приемы";

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

const columns = [
  {
    field: "date",
    header: "Дата",
    formatter: (d) => moment(d).format("DD.MM.YYYY"),
  },
  { field: "clientName", header: "Клиент" },
  { field: "status", header: "Статус" },
  { field: "holderName", header: "Принимающий" },
  { field: "complaints", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

export default function Appointments() {
  const actions = useActions({ loadAppointments });
  const classes = useStyles();
  const appointments = useSelector(selectAllAppointments);

  useEffect(() => {
    actions.loadAppointments();
  }, []);

  return (
    <div className={classes.root}>
      <Header title={TITLE} Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <AppointmentsAccordion>
            <AppointmentsFilter />
          </AppointmentsAccordion>
        </Box>

        <Box mt={5}>
          <Table columns={columns} rows={appointments} />
        </Box>
      </Container>

      {/* <Box className={classes.body}>
        <FilterForm onFilterChange={handleFilterChange} />

        <Table columns={columns} rows={data} />
      </Box> */}
    </div>
  );
}
