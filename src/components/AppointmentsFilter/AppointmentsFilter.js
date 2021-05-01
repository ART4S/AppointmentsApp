import { useEffect } from "react";
import { useSelector } from "react-redux";
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
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Autocomplete } from "@material-ui/lab";

import {
  selectFilter,
  setFilterValue,
  clearFilter,
  loadAppointments,
} from "pages/Appointments/appointmentsSlice";
import { loadUsers, selectAllUsers } from "redux/slices/usersSlice";
import {
  loadAppointmentStatuses,
  selectAllAppointmentStatuses,
} from "redux/slices/appointmentStatusesSlice";

import useActions from "hooks/useActions";
import getFullName from "utils/getFullName";
import { matchSorter } from "match-sorter";

const useStyle = makeStyles((theme) => ({
  control: {
    width: 200,
  },
}));

export default function AppointmentsFilter() {
  const actions = useActions({
    loadUsers,
    loadAppointments,
    loadAppointmentStatuses,
    setFilterValue,
    clearFilter,
  });
  const classes = useStyle();
  const filter = useSelector(selectFilter);
  const appointmentStatuses = useSelector(selectAllAppointmentStatuses);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    actions.loadUsers();
    actions.loadAppointmentStatuses();
  }, []);

  function handleFilterFieldChange(e) {
    const { name } = e.target;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    actions.setFilterValue({ name, value });
  }

  function handleHolderChange(_, holder) {
    actions.setFilterValue({
      name: "holderId",
      value: holder?.id ?? "",
    });
  }

  function handleOnSearch() {
    actions.loadAppointments(filter);
  }

  function handleOnClear() {
    actions.clearFilter();
    actions.loadAppointments();
  }

  const rowSpacing = 3;

  return (
    <form className={classes.form} noValidate>
      <Grid container>
        <Grid item container xs direction="column" spacing={rowSpacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="startDate"
              label="С"
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
              <InputLabel id="statusId-label">Статус</InputLabel>

              <Select
                id="statusId-select"
                name="statusId"
                labelId="statusId-label"
                value={filter.statusId}
                onChange={handleFilterFieldChange}
              >
                <MenuItem key={-1} value="" />

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
              label="Только я"
            />
          </Grid>
        </Grid>

        <Grid item container xs direction="column" spacing={rowSpacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="finishDate"
              label="По"
              type="date"
              value={filter.finishDate}
              onChange={handleFilterFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item container justify="center">
            <Autocomplete
              className={classes.control}
              id="holderId"
              onChange={handleHolderChange}
              value={users.find((x) => x.id === filter.holderId) ?? ""}
              filterOptions={(options, { inputValue }) =>
                matchSorter(options, inputValue, {
                  keys: [
                    (item) => item.firstName,
                    (item) => item.middleName,
                    (item) => item.lastName,
                  ],
                }).sort((firstUser, secondUser) => {
                  const first =
                    firstUser.lastName &&
                    firstUser.lastName.charAt(0).toUpperCase();
                  const second =
                    secondUser.lastName &&
                    secondUser.lastName.charAt(0).toUpperCase();

                  if (first > second) return 1;
                  if (first < second) return -1;
                  return 0;
                })
              }
              options={users}
              getOptionLabel={(option) => getFullName(option)}
              groupBy={(option) =>
                option.lastName && option.lastName.charAt(0).toUpperCase()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="holderId"
                  label="Принимающий"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item container xs spacing={rowSpacing}>
          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="complaints"
              label="Жалобы"
              value={filter.complaints}
              onChange={handleFilterFieldChange}
            />
          </Grid>

          <Grid item container justify="center">
            <TextField
              className={classes.control}
              name="clientName"
              label="Клиент"
              value={filter.clientName}
              onChange={handleFilterFieldChange}
            />
          </Grid>

          <Grid item container justify="center">
            <IconButton color="default" onClick={handleOnSearch}>
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
