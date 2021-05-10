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

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Table from "common/components/Table/Table";

import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedAppointmentId,
  deleteAppointment,
  selectAllAppointments,
  selectSorting,
  selectPagination,
  selectSelectedAppointmentId,
} from "./appointmentsTableSlice";

import AppointmentViewer from "../AppointmentViewer/AppointmentViewer";
import AppointmentEditor from "../AppointmentEditor/AppointmentEditor";

const useToolBarStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
  },
}));

function ToolBar() {
  const dispatch = useDispatch();
  const classes = useToolBarStyles();
  const selectedAppointmentId = useSelector(selectSelectedAppointmentId);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  function handleViewerOpen() {
    setViewerOpen(true);
  }

  function handleViewerClose() {
    setViewerOpen(false);
  }

  function handleEditorOpen() {
    setEditorOpen(true);
  }

  function handleEditorClose() {
    setEditorOpen(false);
  }

  async function handleDelete() {
    await dispatch(deleteAppointment(selectedAppointmentId));
    await dispatch(loadAppointments());
    dispatch(setSelectedAppointmentId(null));
  }

  return (
    <>
      <MuiToolBar className={classes.root}>
        <IconButton>
          <AddIcon />
        </IconButton>

        <IconButton
          disabled={!selectedAppointmentId}
          onClick={handleViewerOpen}
        >
          <VisibilityIcon />
        </IconButton>

        <IconButton
          disabled={!selectedAppointmentId}
          onClick={handleEditorOpen}
        >
          <EditIcon />
        </IconButton>

        <IconButton disabled={!selectedAppointmentId} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </MuiToolBar>

      {selectedAppointmentId && viewerOpen && (
        <AppointmentViewer
          appointmentId={selectedAppointmentId}
          open={viewerOpen}
          onClose={handleViewerClose}
        />
      )}

      {selectedAppointmentId && editorOpen && (
        <AppointmentEditor
          appointmentId={selectedAppointmentId}
          open={editorOpen}
          onClose={handleEditorClose}
        />
      )}
    </>
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
  const dispatch = useDispatch();
  const appointments = useSelector(selectAllAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedAppointmentId = useSelector(selectSelectedAppointmentId);

  React.useEffect(() => {
    dispatch(loadAppointments());
  }, []);

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

  function handleSelectedRowChange(appointment) {
    dispatch(setSelectedAppointmentId(appointment.id));
  }

  function handleClickAway() {
    dispatch(setSelectedAppointmentId(null));
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper>
        <ToolBar />

        <Table
          columns={columns}
          rows={appointments}
          pagination={pagination}
          sorting={sorting}
          selectedRow={appointments.find((x) => x.id === selectedAppointmentId)}
          onSelectedRowChange={handleSelectedRowChange}
          onSortRequest={handleSortRequest}
          onCurrentPageChange={handleCurrentPageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </Paper>
    </ClickAwayListener>
  );
}
