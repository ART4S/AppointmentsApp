import React from "react";
import moment from "moment";

import {
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

import Popup from "common/components/Popup/Popup";

import { appointmentService } from "services";

const APPOINTMENT_DETAILS = "Детали приема";
const OK = "ОК";
const DATE = "Дата";
const CLIENT = "Клиент";
const STATUS = "Статус";
const HOLDER = "Принимающий";
const COMPLAINTS = "Жалобы";
const DIAGNOSIS = "Диагноз";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 0, 0, 1),
  },
  title: {
    padding: theme.spacing(1, 0),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
}));

function Field({ name, value }) {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography style={{ fontWeight: "bold" }}>{name}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
}

function Fields({ appointment }) {
  return (
    <>
      <Field
        name={`${DATE}:`}
        value={moment(appointment.date).format("DD.MM.YYYY HH:MM")}
      />
      <Field name={`${CLIENT}:`} value={appointment.clientName} />
      <Field name={`${STATUS}:`} value={appointment.status} />
      <Field name={`${HOLDER}:`} value={appointment.holderName} />
      <Field name={`${COMPLAINTS}:`} value={appointment.complaints} />
      <Field name={`${DIAGNOSIS}:`} value={appointment.diagnosis} />
    </>
  );
}

function Progress() {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default function AppointmentViewer({ appointmentId, open, onClose }) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [appointment, setAppointment] = React.useState(null);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      setAppointment(await appointmentService.getById(appointmentId));
      setLoading(false);
    }

    loadData();
  }, [appointmentId]);

  return (
    <Popup title={APPOINTMENT_DETAILS} open={open} onClose={onClose}>
      <Box className={classes.content}>
        {loading ? <Progress /> : <Fields appointment={appointment} />}
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button autoFocus variant="contained" color="primary" onClick={onClose}>
          {OK}
        </Button>
      </Box>
    </Popup>
  );
}
