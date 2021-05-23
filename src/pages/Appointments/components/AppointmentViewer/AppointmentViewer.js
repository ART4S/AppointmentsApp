import React from "react";
import moment from "moment";

import { Typography, Button, Box, Grid, makeStyles } from "@material-ui/core";

import Popup from "common/components/Popup/Popup";
import Progress from "common/components/Progress/Progress";

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
  fields: {
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

function reducer(state, action) {
  switch (action.type) {
    case "load": {
      return { ...state, loading: true, error: false };
    }
    case "loadSucceed": {
      return { ...state, loading: false, appointment: action.payload };
    }
    case "loadFailed": {
      return { ...state, loading: false, error: true };
    }
    default:
      return state;
  }
}

export default function AppointmentViewer({ appointmentId, onClose }) {
  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    error: false,
    appointment: null,
  });

  React.useEffect(() => {
    (async () => {
      dispatch({ type: "load" });
      try {
        const appointment = await appointmentService.getById(appointmentId);
        dispatch({ type: "loadSucceed", payload: appointment });
      } catch {
        dispatch({ type: "loadFailed" });
      }
    })();
  }, [appointmentId]);

  return (
    <Popup open title={APPOINTMENT_DETAILS} onClose={onClose}>
      <Box pb={2}>
        {state.loading ? (
          <Progress />
        ) : (
          <>
            <Box className={classes.fields}>
              <Fields appointment={state.appointment} />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button
                autoFocus
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                {OK}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popup>
  );
}
