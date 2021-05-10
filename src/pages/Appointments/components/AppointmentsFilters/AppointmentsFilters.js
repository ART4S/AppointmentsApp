/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  makeStyles,
  MenuItem,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import UserSelector from "common/components/UserSelector/UserSelector";

import { loadAppointments } from "../AppointmentsTable/appointmentsTableSlice";

import {
  loadUsers,
  loadClients,
  loadAppointmentStatuses,
  selectFilter,
  setFilterValue,
  clearFilter,
  selectUsers,
  selectClients,
  selectAppointmentStatuses,
} from "./appointmentsFiltersSlice";

const CLIENT = "Клиент";
const COMPLAINTS = "Жалобы";
const HOLDER = "Принимающий";
const START_DATE = "C";
const FINISH_DATE = "По";
const NONE = "Нет";
const STATUS = "Статус";
const ONLY_ME = "Только я";

const useStyle = makeStyles((_theme) => ({
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  control: {
    width: 200,
  },
}));

export default function AppointmentsFilters() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const users = useSelector(selectUsers);
  const clients = useSelector(selectClients);
  const appointmentStatuses = useSelector(selectAppointmentStatuses);

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadClients());
    dispatch(loadAppointmentStatuses());
  }, []);

  function handleFilterFieldChange(event) {
    dispatch(
      setFilterValue({
        name: event.target.name,
        value:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      }),
    );
  }

  function handleHolderChange(holder) {
    dispatch(
      setFilterValue({
        name: "holderId",
        value: holder?.id ?? "",
      }),
    );
  }

  function handleClientChange(client) {
    dispatch(setFilterValue({ name: "clientId", value: client?.id ?? "" }));
  }

  function handleOnClear() {
    dispatch(clearFilter());
    dispatch(loadAppointments());
  }

  function handleFilterRequest() {
    dispatch(loadAppointments());
  }

  const spacing = 5;

  return (
    <form className={classes.form} noValidate>
      <Grid container>
        <Grid item container xs direction="column" spacing={spacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="startDate"
              label={START_DATE}
              type="date"
              value={filter.startDate}
              onChange={handleFilterFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item container justify="center">
            <FormControl className={classes.control}>
              <InputLabel id="statusId-label">{STATUS}</InputLabel>

              <Select
                id="statusId-select"
                name="statusId"
                labelId="statusId-label"
                value={filter.statusId}
                onChange={handleFilterFieldChange}
              >
                <MenuItem key={-1} value="">
                  {NONE}
                </MenuItem>

                {appointmentStatuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item container justify="center">
            <FormControlLabel
              className={classes.control}
              control={
                <Checkbox
                  name="onlyMe"
                  checked={filter.onlyMe}
                  onChange={handleFilterFieldChange}
                  color="primary"
                />
              }
              label={ONLY_ME}
            />
          </Grid>
        </Grid>

        <Grid item container xs direction="column" spacing={spacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="finishDate"
              label={FINISH_DATE}
              type="date"
              value={filter.finishDate}
              onChange={handleFilterFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item container justify="center">
            <UserSelector
              className={classes.control}
              id="holderId"
              name="holderId"
              label={HOLDER}
              users={users}
              value={users.find((x) => x.id === filter.holderId) ?? ""}
              onChange={handleHolderChange}
            />
          </Grid>
        </Grid>

        <Grid item container xs direction="column" spacing={spacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="complaints"
              label={COMPLAINTS}
              value={filter.complaints}
              onChange={handleFilterFieldChange}
            />
          </Grid>

          <Grid item container justify="center">
            <UserSelector
              className={classes.control}
              id="clientId"
              name="clientId"
              label={CLIENT}
              users={clients}
              value={clients.find((x) => x.id === filter.clientId) ?? ""}
              onChange={handleClientChange}
            />
          </Grid>

          <Grid item container justify="center">
            <IconButton color="default" onClick={handleFilterRequest}>
              <SearchIcon />
            </IconButton>

            <IconButton color="default" onClick={handleOnClear}>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
