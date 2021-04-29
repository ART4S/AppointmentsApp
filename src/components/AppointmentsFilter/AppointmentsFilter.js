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

import { getAppointmentStatuses } from "redux/dictionaries/appointmentStatuses/selectors";
import { getFilter } from "redux/appointments/list/selectors";
import { getUsers } from "redux/users/selectors";

import * as appointmentsActions from "redux/appointments/list/actions";

import useActions from "hooks/useActions";
import useEntities from "hooks/useEntities";
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
  const actions = useActions(appointmentsActions);
  const classes = useStyle();
  const filter = useSelector(getFilter);
  const appointmentStatuses = useEntities(getAppointmentStatuses);
  const users = useEntities(getUsers);

  function handleFilterFieldChange(e) {
    const field = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    actions.setFilterValue(field, value);
  }

  function handleHolderOnChange(event, holder) {
    actions.setFilterValue("holderId", holder.id);
  }

  function handleOnSearch() {
    actions.load(filter.toJS());
  }

  function handleOnClear() {
    actions.clearFilter();
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
        filterOptions={(options, { inputValue }) =>
          matchSorter(options, inputValue)
        }
        options={users.sort((firstUser, secondUser) => {
          const first = firstUser.lastName && firstUser.lastName.charAt(0);
          const second = secondUser.lastName && secondUser.lastName.charAt(0);

          if (first > second) return 1;
          if (first < second) return -1;
          return 0;
        })}
        getOptionLabel={(option) => option && getFullName(option)}
        style={{ minWidth: 200 }}
        groupBy={(option) =>
          option.lastName && option.lastName.charAt(0).toUpperCase()
        }
        onChange={handleHolderOnChange}
        renderInput={(params) => (
          <TextField {...params} name="holderId" label="Принимающий" />
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
