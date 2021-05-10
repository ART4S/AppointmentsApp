/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from "react";
import moment from "moment";
import * as yup from "yup";
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
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

import Popup from "common/components/Popup/Popup";
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
  control: {},
}));

const spacing = 2;

const schema = yup.object().shape({
  holder: yup.object().nullable().required(REQUIRED),
  client: yup.object().nullable().required(REQUIRED),
  diagnosis: yup.string().trim().required(REQUIRED),
});

function EditForm({ data, onSubmit }) {
  const { appointment, clients, users, statuses } = data;

  const classes = useStyles();

  const initialValues = {
    date: appointment.date,
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
      {({ values, touched, errors, handleChange, setFieldValue }) => (
        <Form>
          <Grid container direction="column" spacing={spacing}>
            <Grid item container spacing={spacing}>
              <Grid item xs>
                <UserSelector
                  className={classes.control}
                  users={clients}
                  name="client"
                  label={CLIENT}
                  value={values.client}
                  error={touched.client && Boolean(errors.client)}
                  helperText={errors.client}
                  onChange={(client) => setFieldValue("client", client)}
                />
              </Grid>

              <Grid item xs>
                <UserSelector
                  className={classes.control}
                  id="holder"
                  name="holder"
                  users={users}
                  label={HOLDER}
                  value={values.holder}
                  error={touched.holder && Boolean(errors.holder)}
                  helperText={errors.holder}
                  onChange={(holder) => setFieldValue("holder", holder)}
                />
              </Grid>
            </Grid>

            <Grid item container spacing={spacing}>
              <Grid item xs>
                <FormControl className={classes.control} fullWidth>
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
                  type="date"
                  value={values.date}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                className={classes.control}
                multiline
                id="diagnosis"
                label={DIAGNOSIS}
                placeholder={DIAGNOSIS}
                value={values.diagnosis}
                error={touched.diagnosis && Boolean(errors.diagnosis)}
                helperText={errors.diagnosis}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                className={classes.control}
                id="complaints"
                label={COMPLAINTS}
                placeholder={COMPLAINTS}
                value={values.complaints}
                error={touched.complaints && Boolean(errors.complaints)}
                helperText={errors.complaints}
                onChange={handleChange}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item container justify="flex-end">
              <Button type="sumbit" variant="contained" color="primary">
                {SAVE}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

function Progress() {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default function AppointmentEditor({ appointmentId, open, onClose }) {
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    appointment: null,
    clients: [],
    users: [],
    statuses: [],
  });

  function handleSubmit() {
    onClose();
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
    <Popup title={APPOINTMENT_EDIT} open={open} onClose={onClose}>
      {loading ? (
        <Progress />
      ) : (
        <EditForm data={formData} onSubmit={handleSubmit} />
      )}
    </Popup>
  );
}
