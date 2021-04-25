import { useSelector } from "react-redux";
import {
  Select,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { getAppointmentStatuses } from "redux/dictionaries/appointmentStatuses/selectors";
import { getFilter } from "redux/appointments/list/selectors";

const useStyle = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginRight: theme.spacing(5),
    },
    display: "flex",
    flexDirection: "flex-start",
  },
}));

export default function FilterForm({ onFilterChange, onSearch }) {
  const { startDate, finishDate, clientName, onlyMe, statusId } = useSelector(
    getFilter
  );
  
  const { appointmentStatuses } = useSelector(getAppointmentStatuses);

  const classes = useStyle();

  const handleTextFieldChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const handleDateFieldChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const handleCheckBoxChange = (e) => {
    onFilterChange(e.target.name, e.target.checked);
  };

  return (
    <form className={classes.form} noValidate>
      <TextField
        name="startDate"
        label="С"
        type="date"
        value={startDate}
        onChange={handleDateFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="finishDate"
        label="По"
        type="date"
        value={finishDate}
        onChange={handleDateFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="clientName"
        label="Клиент"
        value={clientName}
        onChange={handleTextFieldChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="onlyMe"
            checked={onlyMe}
            onChange={handleCheckBoxChange}
            color="primary"
          />
        }
        label="Только я"
      />

      <FormControl>
        <InputLabel id="statusId-label">Age</InputLabel>
        <Select
          id="statusId"
          labelId="statusId-label"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <IconButton color="default" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </form>
  );
}
