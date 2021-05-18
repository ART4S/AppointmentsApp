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
import BusyScreen from "common/components/BusyScreen/BusyScreen";
import appointmentStatuses from "model/enums/appointmentStatuses";

import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedAppointmentId,
  setFirstAppointmentSelected,
  deleteAppointment,
  selectAllAppointments,
  selectSorting,
  selectPagination,
  selectAppointmentId,
  selectBusy,
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

function ToolBar({
  isAppointmentSelected,
  onViewOpenClick,
  onEditOpenClick,
  onDeleteClick,
}) {
  const classes = useToolBarStyles();

  return (
    <>
      <MuiToolBar className={classes.root}>
        <IconButton>
          <AddIcon />
        </IconButton>

        <IconButton disabled={!isAppointmentSelected} onClick={onViewOpenClick}>
          <VisibilityIcon />
        </IconButton>

        <IconButton disabled={!isAppointmentSelected} onClick={onEditOpenClick}>
          <EditIcon />
        </IconButton>

        <IconButton disabled={!isAppointmentSelected} onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </MuiToolBar>
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
  {
    field: "status",
    header: "Статус",
    enableSort: true,
    formatter: (s) => appointmentStatuses[s],
  },
  {
    field: "clientName",
    header: "Клиент",
    enableSort: true,
  },
  { field: "holderName", header: "Принимающий", enableSort: true },
  { field: "complaints", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

export default function AppointmentsTable() {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAllAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedAppointmentId = useSelector(selectAppointmentId);
  const busy = useSelector(selectBusy);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      await dispatch(loadAppointments());
      dispatch(setFirstAppointmentSelected());
    }

    loadData();
  }, []);

  function handleSortRequest(order, field) {
    dispatch(setSorting({ order, field }));
    dispatch(loadAppointments());
  }

  async function handleCurrentPageChange(newPage) {
    dispatch(setCurrentPage(newPage));
    await dispatch(loadAppointments());
    dispatch(setFirstAppointmentSelected());
  }

  async function handleItemsPerPageChange(newItemsPerPage) {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(0));
    await dispatch(loadAppointments());
    dispatch(setFirstAppointmentSelected());
  }

  async function handleDelete() {
    await dispatch(deleteAppointment(selectedAppointmentId));
    await dispatch(loadAppointments());
    dispatch(setFirstAppointmentSelected());
  }

  function handleEditSubmitted() {
    setEditorOpen(false);
    dispatch(loadAppointments());
  }

  return (
    <ClickAwayListener
      onClickAway={() => dispatch(setSelectedAppointmentId(null))}
    >
      <Paper>
        <BusyScreen isBusy={busy}>
          <ToolBar
            isAppointmentSelected={Boolean(selectedAppointmentId)}
            onViewOpenClick={() => setViewerOpen(true)}
            onEditOpenClick={() => setEditorOpen(true)}
            onDeleteClick={handleDelete}
          />

          <Table
            columns={columns}
            rows={appointments}
            pagination={pagination}
            sorting={sorting}
            selectedRow={appointments.find(
              (x) => x.id === selectedAppointmentId,
            )}
            onSelectedRowChange={(appointment) =>
              dispatch(setSelectedAppointmentId(appointment.id))
            }
            onSortRequest={handleSortRequest}
            onCurrentPageChange={handleCurrentPageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {selectedAppointmentId && viewerOpen && (
            <AppointmentViewer
              appointmentId={selectedAppointmentId}
              onClose={() => setViewerOpen(false)}
            />
          )}

          {selectedAppointmentId && editorOpen && (
            <AppointmentEditor
              appointmentId={selectedAppointmentId}
              onSubmitted={handleEditSubmitted}
              onClose={() => setEditorOpen(false)}
            />
          )}
        </BusyScreen>
      </Paper>
    </ClickAwayListener>
  );
}
