/* eslint-disable no-param-reassign */
import React from "react";
import { createReducer } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { Typography, Button, Box, Grid, makeStyles } from "@material-ui/core";

import Popup from "common/components/Popup/Popup";
import Progress from "common/components/Progress/Progress";

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
  const { t } = useTranslation();

  return (
    <>
      <Field
        name={`${t("appointments.viewer.date")}:`}
        value={moment(appointment.date).format(DATE_FORMAT)}
      />
      <Field
        name={`${t("appointments.viewer.client")}:`}
        value={appointment.clientName}
      />
      <Field
        name={`${t("appointments.viewer.status")}:`}
        value={appointment.status}
      />
      <Field
        name={`${t("appointments.viewer.holder")}:`}
        value={appointment.holderName}
      />
      <Field
        name={`${t("appointments.viewer.complaints")}:`}
        value={appointment.complaints}
      />
      <Field
        name={`${t("appointments.viewer.diagnosis")}:`}
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
  const { t } = useTranslation();

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
    <Popup open title={t("appointments.viewer.header")} onClose={onClose}>
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
                {t("actions.ok")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popup>
  );
}
