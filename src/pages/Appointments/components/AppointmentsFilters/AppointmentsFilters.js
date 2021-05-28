/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
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
import { debounce } from "lodash";

import EmployeeSelector from "common/components/EmployeeSelector/EmployeeSelector";
import ClientSelector from "common/components/ClientSelector/ClientSelector";

import useLocalization from "common/hooks/useLocalization";

import appointmentStatuses from "model/enums/appointmentStatuses";

import { loadAppointments } from "../AppointmentsTable/appointmentsTableSlice";

import {
  setFilterValue,
  setClient,
  setHolder,
  clearFilter,
  selectFilter,
  selectClient,
  selectHolder,
} from "./appointmentsFiltersSlice";

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
  const dispatch = useDispatch();
  const l = useLocalization();
  const classes = useStyle();
  const filter = useSelector(selectFilter);
  const client = useSelector(selectClient);
  const holder = useSelector(selectHolder);

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

  const handleOnApplyFilters = React.useCallback(
    debounce(() => dispatch(loadAppointments()), 500),
    [],
  );

  const handleOnClear = React.useCallback(
    debounce(() => {
      dispatch(clearFilter());
      dispatch(loadAppointments());
    }, 500),
    [],
  );

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <Grid container>
          <Grid item container xs direction="column" spacing={SPACING}>
            <Grid item container justify="center">
              <TextField
                className={classes.control}
                name="startDate"
                label={l("appointments.filters.fromDate")}
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
                <InputLabel id="status-label">
                  {l("appointments.filters.status")}
                </InputLabel>

                <Select
                  id="status-select"
                  name="status"
                  labelId="status-label"
                  value={filter.status}
                  onChange={handleFilterFieldChange}
                >
                  <MenuItem key={-1} value="">
                    {l("appointments.filters.none")}
                  </MenuItem>

                  {Object.values(appointmentStatuses).map((status) => (
                    <MenuItem key={status} value={status}>
                      {l(`model.appointmentStatuses.${status}`)}
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
                label={l("appointments.filters.onlyMe")}
              />
            </Grid>
          </Grid>

          <Grid item container xs direction="column" spacing={SPACING}>
            <Grid item container justify="center">
              <TextField
                className={classes.control}
                name="finishDate"
                label={l("appointments.filters.toDate")}
                type="date"
                value={filter.finishDate}
                onChange={handleFilterFieldChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item container justify="center">
              <EmployeeSelector
                className={classes.control}
                id="holderId"
                name="holderId"
                value={holder}
                label={l("appointments.filters.holder")}
                onChange={(holder) => dispatch(setHolder(holder))}
              />
            </Grid>
          </Grid>

          <Grid item container xs direction="column" spacing={SPACING}>
            <Grid item container justify="center">
              <TextField
                className={classes.control}
                name="complaints"
                label={l("appointments.filters.complaints")}
                value={filter.complaints}
                onChange={handleFilterFieldChange}
              />
            </Grid>

            <Grid item container justify="center">
              <ClientSelector
                className={classes.control}
                id="clientId"
                name="clientId"
                label={l("appointments.filters.client")}
                value={client}
                onChange={(client) => dispatch(setClient(client))}
              />
            </Grid>

            <Grid item container justify="center">
              <IconButton color="default" onClick={handleOnApplyFilters}>
                <SearchIcon />
              </IconButton>

              <IconButton color="default" onClick={handleOnClear}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
