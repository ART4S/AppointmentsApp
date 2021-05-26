/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from "react";
import { createReducer } from "@reduxjs/toolkit";
import moment from "moment";
import { Formik, Form } from "formik";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Popup from "common/components/Popup/Popup";
import Progress from "common/components/Progress/Progress";
import EmployeeSelector from "common/components/EmployeeSelector/EmployeeSelector";
import ClientSelector from "common/components/ClientSelector/ClientSelector";
import { appointmentService, employeeService, clientService } from "services";
import appointmentStatuses from "model/enums/appointmentStatuses";
import { getFullName } from "utils/userUtils";

const APPOINTMENT_EDIT = "Редактирование приема";
const CLIENT = "Клиент";
const HOLDER = "Принимающий";
const DATE = "Дата";
const DIAGNOSIS = "Диагноз";
const COMPLAINTS = "Жалобы";
const STATUS = "Статус";
const SAVE = "Сохранить";
const REQUIRED = "Необходимо указать";
const LOAD_ERROR =
  "Произошла ошибка в процессе загрузки данных.\nПопробуйте обновить страницу";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
  control: {
    cursor: "pointer",
  },
}));

const SPACING = 2;
const DATE_FORMAT = "YYYY-MM-DDTHH:mm";

function EditForm(props) {
  const {
    data: { appointment, client, holder },
    onSubmitted,
  } = props;

  const classes = useStyles();

  const [serverErrors, setServerErrors] = React.useState([]);

  const initialValues = {
    date: moment(appointment.date).format(DATE_FORMAT),
    status: appointment.status,
    diagnosis: appointment.diagnosis,
    complaints: appointment.complaints,
    holder,
    client: {
      id: client.id,
      fullName: getFullName(client),
    },
  };

  function checkStatus(status, allowedStatuses) {
    if (!allowedStatuses.some((s) => s === status)) {
      return `Допустимые значения: ${Object.values(allowedStatuses)
        .map((x) => `'${x}'`)
        .join(", ")}`;
    }
    return undefined;
  }

  function validate(values) {
    const errors = {};

    if (!values.date) {
      errors.date = REQUIRED;
    } else if (moment(values.date).isBefore(moment(), "day")) {
      errors.status = checkStatus(values.status, [
        appointmentStatuses.canceled,
        appointmentStatuses.missed,
        appointmentStatuses.completed,
      ]);
    } else if (moment(values.date).isAfter(moment(), "day")) {
      errors.status = checkStatus(values.status, [
        appointmentStatuses.pending,
        appointmentStatuses.canceled,
        appointmentStatuses.postponed,
      ]);
    } else {
      errors.status = checkStatus(values.status, [
        appointmentStatuses.active,
        appointmentStatuses.completed,
        appointmentStatuses.canceled,
      ]);
    }

    if (!values.client) {
      errors.client = REQUIRED;
    }

    if (!values.holder) {
      errors.holder = REQUIRED;
    }

    if (
      values.status === appointmentStatuses.pending &&
      (!values.diagnosis || !values.diagnosis.trim())
    ) {
      errors.diagnosis = REQUIRED;
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    const editedAppointment = {
      data: values.date,
      status: values.status,
      holderId: values.holder.id,
      clientId: values.client.id,
      diagnosis: values.diagnosis,
      complaints: values.complaints,
    };

    const { isSuccess, data } = await appointmentService.update(
      appointment.id,
      editedAppointment,
    );

    if (isSuccess) {
      onSubmitted();
    } else {
      const {
        error: { common, fields },
      } = data;

      setServerErrors(common);

      Object.entries(fields).forEach(([field, errors]) => {
        switch (field) {
          case "clientId": {
            field = "client";
            break;
          }
          case "holderId": {
            field = "holder";
            break;
          }
        }

        setFieldError(field, errors.join("; "));
      });

      setSubmitting(false);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form>
          <Grid container direction="column" spacing={SPACING}>
            {serverErrors.map((error) => (
              <Grid item key={error}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            ))}

            <Grid item container spacing={SPACING}>
              <Grid item xs>
                <ClientSelector
                  className={classes.control}
                  name="client"
                  label={CLIENT}
                  value={values.client}
                  error={touched.client && Boolean(errors.client)}
                  helperText={touched.client && errors.client}
                  disabled={isSubmitting}
                  onChange={(client) => setFieldValue("client", client)}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs>
                <EmployeeSelector
                  className={classes.control}
                  name="holder"
                  label={HOLDER}
                  value={values.holder}
                  error={touched.holder && Boolean(errors.holder)}
                  helperText={touched.holder && errors.holder}
                  disabled={isSubmitting}
                  onChange={(holder) => setFieldValue("holder", holder)}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={SPACING}>
              <Grid item xs>
                <FormControl
                  fullWidth
                  className={classes.control}
                  error={Boolean(errors.status)}
                  disabled={isSubmitting}
                >
                  <InputLabel shrink id="status-input">
                    {STATUS}
                  </InputLabel>

                  <Select
                    id="status"
                    name="status"
                    labelId="status-label"
                    value={values.status}
                    onChange={handleChange}
                    MenuProps={{ disablePortal: true }}
                  >
                    {Object.keys(appointmentStatuses).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText disabled={!errors.status}>
                    {errors.status}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs>
                <TextField
                  fullWidth
                  className={classes.control}
                  id="date"
                  name="date"
                  label={DATE}
                  type="datetime-local"
                  value={values.date}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                multiline
                className={classes.control}
                id="diagnosis"
                label={DIAGNOSIS}
                placeholder={DIAGNOSIS}
                value={values.diagnosis}
                error={touched.diagnosis && Boolean(errors.diagnosis)}
                helperText={touched.diagnosis && errors.diagnosis}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                multiline
                className={classes.control}
                id="complaints"
                label={COMPLAINTS}
                placeholder={COMPLAINTS}
                value={values.complaints}
                error={touched.complaints && Boolean(errors.complaints)}
                helperText={touched.complaints && errors.complaints}
                disabled={isSubmitting}
                onChange={handleChange}
              />
            </Grid>

            <Grid item container justify="flex-end">
              <Button
                type="sumbit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {SAVE}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

const reducer = createReducer(
  {},
  {
    load(state) {
      state.loading = true;
      state.error = false;
    },

    loadSucceed(state, action) {
      state.loading = false;
      state.data = action.payload;
    },

    loadFailed(state) {
      state.loading = false;
      state.error = true;
    },
  },
);

export default function AppointmentEditor({
  appointmentId,
  onClose,
  onSubmitted,
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    error: false,
    data: {
      appointment: null,
      client: null,
      holder: null,
    },
  });

  React.useEffect(() => {
    let active = true;

    (async () => {
      dispatch({ type: "load" });

      try {
        const appointment = await appointmentService.getById(appointmentId);
        const [client, holder] = await Promise.all([
          clientService.getById(appointment.clientId),
          employeeService.getById(appointment.holderId),
        ]);

        if (active) {
          dispatch({
            type: "loadSucceed",
            payload: {
              appointment,
              client,
              holder,
            },
          });
        }
      } catch {
        if (active) {
          dispatch({ type: "loadFailed" });
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [appointmentId]);

  function renderForm() {
    if (state.error) {
      return <Alert severity="error">{LOAD_ERROR}</Alert>;
    }

    if (state.loading) {
      return <Progress />;
    }

    return <EditForm data={state.data} onSubmitted={onSubmitted} />;
  }

  return (
    <Popup open title={APPOINTMENT_EDIT} onClose={onClose}>
      <Box pb={2}>{renderForm()}</Box>
    </Popup>
  );
}
