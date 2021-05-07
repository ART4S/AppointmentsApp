/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Paper,
  Toolbar as MuiToolBar,
  IconButton,
  ClickAwayListener,
  makeStyles,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

import Table from "common/components/Table/Table";

import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  deleteAppointment,
  selectAllAppointments,
  selectSorting,
  selectPagination,
} from "./appointmentsTableSlice";

import AppointmentView from "../AppointmentView/AppointmentView";

const useToolBarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
  },
}));

function ToolBar({ selectedElement, onView, onDelete }) {
  const classes = useToolBarStyles();

  function handleOnDelete() {
    onDelete(selectedElement);
  }

  function handleOnView() {
    onView(selectedElement);
  }

  return (
    <MuiToolBar className={classes.root}>
      <IconButton>
        <AddIcon />
      </IconButton>

      <IconButton disabled={!selectedElement} onClick={handleOnView}>
        <SearchIcon />
      </IconButton>

      <IconButton disabled={!selectedElement}>
        <EditIcon />
      </IconButton>

      <IconButton disabled={!selectedElement} onClick={handleOnDelete}>
        <DeleteIcon />
      </IconButton>
    </MuiToolBar>
  );
}

const columns = [
  {
    field: "date",
    header: "Дата",
    enableSort: true,
    formatter: (d) => moment(d).format("DD.MM.YYYY"),
  },
  { field: "clientName", header: "Клиент", enableSort: true },
  { field: "status", header: "Статус", enableSort: true },
  { field: "holderName", header: "Принимающий", enableSort: true },
  { field: "complaints", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

export default function AppointmentsTable() {
  const appointments = useSelector(selectAllAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);

  const [selectedAppointment, setSelectedAppointment] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadAppointments());
  }, []);

  function handleSelectChange(newSelected) {
    setSelectedAppointment(newSelected);
  }

  function handleSortRequest(order, field) {
    dispatch(setSorting({ order, field }));
    dispatch(loadAppointments());
  }

  function handleCurrentPageChange(newPage) {
    dispatch(setCurrentPage(newPage));
    dispatch(loadAppointments());
  }

  function handleItemsPerPageChange(newItemsPerPage) {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(0));
    dispatch(loadAppointments());
  }

  function handleClickAway() {
    setSelectedAppointment(null);
  }

  async function handleDeleteAppointment(appointment) {
    await dispatch(deleteAppointment(appointment.id));
    await dispatch(loadAppointments());
    setSelectedAppointment(null);
  }

  const [openAppointmentView, setOpenAppointmentView] = React.useState(false);

  function handleViewAppointment(appointment) {
    setOpenAppointmentView(true);
  }

  function handleCloseAppointmentView() {
    setOpenAppointmentView(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper>
        <ToolBar
          selectedElement={selectedAppointment}
          onView={handleViewAppointment}
          onDelete={handleDeleteAppointment}
        />

        <Table
          columns={columns}
          rows={appointments}
          pagination={pagination}
          sorting={sorting}
          selectedRow={selectedAppointment}
          onSelectChange={handleSelectChange}
          onSortRequest={handleSortRequest}
          onCurrentPageChange={handleCurrentPageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        {selectedAppointment && (
          <AppointmentView
            disableBackdropClick
            disableEscapeKeyDown
            open={openAppointmentView}
            onClose={handleCloseAppointmentView}
            appointment={selectedAppointment}
          />
        )}
      </Paper>
    </ClickAwayListener>
  );
}
