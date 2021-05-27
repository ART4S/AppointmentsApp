/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { Box, Grid, Button, TextField, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Popup from "common/components/Popup/Popup";
import EmployeeSelector from "common/components/EmployeeSelector/EmployeeSelector";
import ClientSelector from "common/components/ClientSelector/ClientSelector";
import { appointmentService } from "services";

const SPACING = 2;
const DATE_FORMAT = "YYYY-MM-DDTHH:mm";

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

function CreateForm({ onSubmitted }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [serverErrors, setServerErrors] = React.useState([]);

  const initialValues = {
    date: moment().add(5, "minutes").format(DATE_FORMAT),
    holder: null,
    client: null,
  };

  function validate(values) {
    const errors = {};

    if (!values.date) {
      errors.date = t("required");
    } else if (moment(values.date).isBefore(moment())) {
      errors.date = t("dateMustBeGreaterThanCurrent");
    }

    if (!values.client) {
      errors.client = t("required");
    }

    if (!values.holder) {
      errors.holder = t("required");
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
      return;
    }

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
                  label={t("date")}
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
                  label={t("client")}
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
                  label={t("holder")}
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
                {t("save")}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default function AppointmentCreator({ onSubmitted, onClose }) {
  const { t } = useTranslation();

  return (
    <Popup open title={t("createAppointment")} onClose={onClose}>
      <Box pb={2}>
        <CreateForm onSubmitted={onSubmitted} />
      </Box>
    </Popup>
  );
}
