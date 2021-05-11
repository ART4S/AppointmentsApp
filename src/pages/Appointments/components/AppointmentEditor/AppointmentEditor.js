/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from "react";
import moment from "moment";
import * as yup from "yup";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

import Popup from "common/components/Popup/Popup";
import Progress from "common/components/Progress/Progress";
import UserSelector from "common/components/UserSelector/UserSelector";

import {
  appointmentService,
  userService,
  clientService,
  dictionaryService,
} from "services";

const APPOINTMENT_EDIT = "Редактирование приема";
const CLIENT = "Клиент";
const HOLDER = "Принимающий";
const DATE = "Дата";
const DIAGNOSIS = "Диагноз";
const COMPLAINTS = "Жалобы";
const STATUS = "Статус";
const SAVE = "Сохранить";
const REQUIRED = "необходимо указать";

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

const spacing = 2;

const schema = yup.object().shape({
  holder: yup.object().nullable().required(REQUIRED),
  client: yup.object().nullable().required(REQUIRED),
  diagnosis: yup.string().trim().required(REQUIRED),
});

const dateFormat = "YYYY-MM-DDTHH:mm";

function EditForm({ data, onSubmit }) {
  const { appointment, clients, users, statuses } = data;

  const classes = useStyles();

  const initialValues = {
    date: moment(appointment.date).format(dateFormat),
    holder: users.find((x) => x.id === appointment.holderId),
    client: clients.find((x) => x.id === appointment.clientId),
    status: statuses.find((x) => x.id === appointment.statusId),
    diagnosis: appointment.diagnosis,
    complaints: appointment.complaints,
  };

  function handleSubmit(values) {
    onSubmit();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
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
          <Grid container direction="column" spacing={spacing}>
            <Grid item container spacing={spacing}>
              <Grid item xs>
                <UserSelector
                  className={classes.control}
                  name="client"
                  users={clients}
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
                <UserSelector
                  className={classes.control}
                  name="holder"
                  users={users}
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

            <Grid item container spacing={spacing}>
              <Grid item xs>
                <FormControl
                  fullWidth
                  className={classes.control}
                  disabled={isSubmitting}
                >
                  <InputLabel shrink id="statusId-inputlabel">
                    {STATUS}
                  </InputLabel>

                  <Select
                    id="statusId"
                    name="statusId"
                    labelId="statusId-label"
                    value={values.status}
                    MenuProps={{ disablePortal: true }}
                  >
                    {statuses.map((x) => (
                      <MenuItem key={x.id} value={x}>
                        {x.name}
                      </MenuItem>
                    ))}
                  </Select>
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
                helperText={errors.complaints}
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

export default function AppointmentEditor({ appointmentId, open, onClose }) {
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    appointment: null,
    clients: [],
    users: [],
    statuses: [],
  });

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      onClose();
      setSubmitting(false);
    }, 2000);
  }

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [appointment, clients, users, statuses] = await Promise.all([
        appointmentService.getById(appointmentId),
        clientService.getAll(),
        userService.getAll(),
        dictionaryService.getAppointmentStatuses(),
      ]);

      setFormData({
        appointment,
        users,
        clients,
        statuses,
      });

      setLoading(false);
    }

    loadData();
  }, [appointmentId]);

  return (
    <Popup
      title={APPOINTMENT_EDIT}
      open={open}
      closeDisabled={submitting}
      onClose={onClose}
    >
      {loading ? (
        <Progress />
      ) : (
        <EditForm data={formData} onSubmit={handleSubmit} />
      )}
    </Popup>
  );
}
