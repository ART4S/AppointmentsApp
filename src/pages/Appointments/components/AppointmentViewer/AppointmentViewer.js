/* eslint-disable no-param-reassign */
import React from "react";
import { createReducer } from "@reduxjs/toolkit";
import moment from "moment";

import { Typography, Button, Box, Grid, makeStyles } from "@material-ui/core";

import Popup from "common/components/Popup/Popup";
import Progress from "common/components/Progress/Progress";

import useLocalization from "common/hooks/useLocalization";

import { appointmentService } from "services";

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

const DATE_FORMAT = "DD.MM.YYYY HH:MM";

function Fields({ appointment }) {
  const l = useLocalization();

  return (
    <>
      <Field
        name={`${l("appointments.viewer.date")}:`}
        value={moment(appointment.date).format(DATE_FORMAT)}
      />
      <Field
        name={`${l("appointments.viewer.client")}:`}
        value={appointment.clientName}
      />
      <Field
        name={`${l("appointments.viewer.status")}:`}
        value={l(`model.appointmentStatuses.${appointment.status}`)}
      />
      <Field
        name={`${l("appointments.viewer.holder")}:`}
        value={appointment.holderName}
      />
      <Field
        name={`${l("appointments.viewer.complaints")}:`}
        value={appointment.complaints}
      />
      <Field
        name={`${l("appointments.viewer.diagnosis")}:`}
        value={appointment.diagnosis}
      />
    </>
  );
}

const reducer = createReducer(
  {},
  {
    loadAppointment(state) {
      state.loading = true;
      state.error = false;
    },

    loadAppointmentSucceed(state, action) {
      state.loading = false;
      state.appointment = action.payload;
    },

    loadAppointmentFailed(state) {
      state.loading = false;
      state.error = true;
    },
  },
);

export default function AppointmentViewer({ appointmentId, onClose }) {
  const classes = useStyles();
  const l = useLocalization();

  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    error: false,
    appointment: null,
  });

  React.useEffect(() => {
    (async () => {
      dispatch({ type: "loadAppointment" });
      try {
        const appointment = await appointmentService.getById(appointmentId);
        dispatch({ type: "loadAppointmentSucceed", payload: appointment });
      } catch {
        dispatch({ type: "loadAppointmentFailed" });
      }
    })();
  }, [appointmentId]);

  return (
    <Popup open title={l("appointments.viewer.header")} onClose={onClose}>
      <Box pb={2}>
        {state.loading ? (
          <Progress />
        ) : (
          <>
            <div className={classes.fields}>
              <Fields appointment={state.appointment} />
            </div>

            <Box display="flex" justifyContent="flex-end">
              <Button
                autoFocus
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                {l("actions.ok")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popup>
  );
}
