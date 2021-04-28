import { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import moment from "moment";

import appointmentsListActions from "redux/appointments/list/actions";
import appointmentStatusesActions from "redux/dictionaries/appointmentStatuses/actions";
import { getAppointments } from "redux/appointments/list/selectors";

import Header from "components/Header/Header";
import AppointmentsFilter from "components/AppointmentsFilter/AppointmentsFilter";
import Table from "components/Table/Table";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import useActions from "hooks/useActions";
import useEntities from "hooks/useEntities";

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
  { field: "compliences", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

export default function Appointments() {
  const classes = useStyles();
  const actions = {
    appointments: useActions(appointmentsListActions),
    appointmentStatuses: useActions(appointmentStatusesActions),
  };
  const appointments = useEntities(getAppointments);

  useEffect(() => {
    actions.appointments.load();
    actions.appointmentStatuses.load();
  }, []);

  return (
    <div className={classes.root}>
      <Header title={TITLE} Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <AppointmentsFilter />
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
