/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import React from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import { Box, Grid, Button, TextField, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Popup from "common/components/Popup/Popup";
import EmployeeSelector from "common/components/EmployeeSelector/EmployeeSelector";
import ClientSelector from "common/components/ClientSelector/ClientSelector";
import { appointmentService } from "services";

const APPOINTMENT_CREATE = "Создание приема";
const CLIENT = "Клиент";
const HOLDER = "Принимающий";
const DATE = "Дата";
const SAVE = "Сохранить";
const REQUIRED = "Необходимо указать";

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

function CreateForm({ onSubmitted }) {
  const classes = useStyles();

  const [serverErrors, setServerErrors] = React.useState([]);

  const initialValues = {
    date: moment().add(5, "minutes").format(DATE_FORMAT),
    holder: null,
    client: null,
  };

  function validate(values) {
    const errors = {};

    if (!values.date) {
      errors.date = REQUIRED;
    } else if (moment(values.date).isBefore(moment())) {
      errors.date = "Дата должна быть больше текущей";
    }

    if (!values.client) {
      errors.client = REQUIRED;
    }

    if (!values.holder) {
      errors.holder = REQUIRED;
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    const appointment = {
      date: values.date,
      holderId: values.holder.id,
      clientId: values.client.id,
    };

    const { isSuccess, data } = await appointmentService.create(appointment);

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
            </Grid>

            <Grid item container spacing={SPACING}>
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

export default function AppointmentCreator({ onSubmitted, onClose }) {
  return (
    <Popup open title={APPOINTMENT_CREATE} onClose={onClose}>
      <Box pb={2}>
        <CreateForm onSubmitted={onSubmitted} />
      </Box>
    </Popup>
  );
}
