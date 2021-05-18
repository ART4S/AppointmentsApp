/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
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
import BusyScreen from "common/components/BusyScreen/BusyScreen";

import appointmentStatuses from "model/enums/appointmentStatuses";

import { loadAppointments } from "../AppointmentsTable/appointmentsTableSlice";

import {
  loadUsers,
  loadClients,
  selectFilter,
  setFilterValue,
  setBusy,
  clearFilter,
  selectUsers,
  selectClients,
  selectBusy,
} from "./appointmentsFiltersSlice";

const CLIENT = "Клиент";
const COMPLAINTS = "Жалобы";
const HOLDER = "Принимающий";
const START_DATE = "C";
const FINISH_DATE = "По";
const NONE = "Нет";
const STATUS = "Статус";
const ONLY_ME = "Только я";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  form: {
    padding: theme.spacing(2),
  },
  control: {
    width: 200,
  },
}));

const SPACING = 5;

export default function AppointmentsFilters() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const users = useSelector(selectUsers);
  const clients = useSelector(selectClients);
  const busy = useSelector(selectBusy);

  useEffect(() => {
    async function loadData() {
      dispatch(setBusy(true));
      await Promise.all([dispatch(loadUsers()), dispatch(loadClients())]);
      dispatch(setBusy(false));
    }

    loadData();
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

  return (
    <Box className={classes.root}>
      <BusyScreen isBusy={busy}>
        <form className={classes.form} noValidate>
          <Grid container>
            <Grid item container xs direction="column" spacing={SPACING}>
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
                  <InputLabel id="status-label">{STATUS}</InputLabel>

                  <Select
                    id="status-select"
                    name="status"
                    labelId="status-label"
                    value={filter.status}
                    onChange={handleFilterFieldChange}
                  >
                    <MenuItem key={-1} value="">
                      {NONE}
                    </MenuItem>

                    {Object.keys(appointmentStatuses).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
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

            <Grid item container xs direction="column" spacing={SPACING}>
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

            <Grid item container xs direction="column" spacing={SPACING}>
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
      </BusyScreen>
    </Box>
  );
}
