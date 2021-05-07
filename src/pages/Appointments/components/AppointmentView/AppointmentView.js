import React from "react";
import moment from "moment";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Button,
  Box,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { Close as CloseIcon } from "@material-ui/icons";

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

export default function AppointmentView({ appointment, onClose, ...rest }) {
  const classes = useStyles();

  return (
    <Dialog fullWidth maxWidth="sm" {...rest}>
      <DialogTitle className={classes.header} disableTypography>
        <Typography className={classes.title} variant="h5">
          {APPOINTMENT_DETAILS}
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Field
          name={`${DATE}:`}
          value={moment(appointment.date).format("DD.MM.YYYY HH:MM")}
        />

        <Field name={`${CLIENT}:`} value={appointment.clientName} />

        <Field name={`${STATUS}:`} value={appointment.status} />

        <Field name={`${HOLDER}:`} value={appointment.holderName} />

        <Field name={`${COMPLAINTS}:`} value={appointment.complaints} />

        <Field name={`${DIAGNOSIS}:`} value={appointment.diagnosis} />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          {OK}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
