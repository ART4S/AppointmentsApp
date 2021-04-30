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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { Autocomplete } from "@material-ui/lab";

import {
  appointmentsActions,
  appointmentsSelectors,
} from "features/Appointments/appointmentsSlice";
import { usersActions, usersSelectors } from "redux/slices/usersSlice";
import {
  appointmentStatusesActions,
  appointmentStatusesSelectors,
} from "redux/slices/appointmentStatusesSlice";

import useActions from "hooks/useActions";
import getFullName from "utils/getFullName";
import { matchSorter } from "match-sorter";

const useStyle = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginRight: theme.spacing(5),
    },
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "flex-start",
  },
}));

export default function AppointmentsFilter() {
  const actions = {
    appointments: useActions(appointmentsActions),
    appointmentStatuses: useActions(appointmentStatusesActions),
    users: useActions(usersActions),
  };
  const classes = useStyle();
  const filter = useSelector(appointmentsSelectors.selectFilter);
  const appointmentStatuses = useSelector(appointmentStatusesSelectors.selectAll);
  const users = useSelector(usersSelectors.selectAll);

  useEffect(() => {
    actions.users.load();
    actions.appointmentStatuses.load();
  }, []);

  function handleFilterFieldChange(e) {
    const { name } = e.target;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    actions.appointments.setFilterValue({ name, value });
  }

  function handleHolderChange(_, holder) {
    actions.appointments.setFilterValue({
      name: "holderId",
      value: holder?.id ?? "",
    });
  }

  function handleOnSearch() {
    actions.appointments.load(filter);
  }

  function handleOnClear() {
    actions.appointments.clearFilter();
    actions.appointments.load();
  }

  return (
    <form className={classes.form} noValidate>
      <TextField
        name="startDate"
        label="С"
        type="date"
        value={filter.startDate}
        onChange={handleFilterFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="finishDate"
        label="По"
        type="date"
        value={filter.finishDate}
        onChange={handleFilterFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="clientName"
        label="Клиент"
        value={filter.clientName}
        onChange={handleFilterFieldChange}
      />

      <FormControlLabel
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

      <FormControl>
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

      <Autocomplete
        id="holderId"
        onChange={handleHolderChange}
        value={users.find((x) => x.id === filter.holderId) ?? ""}
        filterOptions={(options, { inputValue }) => matchSorter(options, inputValue)}
        options={users.sort((firstUser, secondUser) => {
          const first = firstUser.lastName && firstUser.lastName.charAt(0).toUpperCase();
          const second = secondUser.lastName && secondUser.lastName.charAt(0).toUpperCase();

          if (first > second) return 1;
          if (first < second) return -1;
          return 0;
        })}
        getOptionLabel={(option) => getFullName(option)}
        style={{ minWidth: 200 }}
        groupBy={(option) => option.lastName && option.lastName.charAt(0).toUpperCase()}
        renderInput={(params) => (
          <TextField {...params} name="holderId" label="Принимающий" fullWidth />
        )}
      />

      <TextField
        name="complaints"
        label="Жалобы"
        value={filter.complaints}
        onChange={handleFilterFieldChange}
      />

      <IconButton color="default" onClick={handleOnSearch}>
        <SearchIcon />
      </IconButton>

      <IconButton color="default" onClick={handleOnClear}>
        <ClearIcon />
      </IconButton>
    </form>
  );
}
