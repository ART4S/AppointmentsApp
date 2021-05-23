/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { debounce, throttle } from "lodash";
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
  setSelectedAppointment,
  deleteAppointment,
  selectAllAppointments,
  selectSorting,
  selectPagination,
  selectAppointment,
  selectBusy,
} from "./appointmentsTableSlice";

import AppointmentCreator from "../AppointmentCreator/AppointmentCreator";
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
  onCreateOpenClick,
  onViewOpenClick,
  onEditOpenClick,
  onDeleteClick,
}) {
  const classes = useToolBarStyles();

  return (
    <>
      <MuiToolBar className={classes.root}>
        <IconButton onClick={onCreateOpenClick}>
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
  const busy = useSelector(selectBusy);
  const appointments = useSelector(selectAllAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedAppointment = useSelector(selectAppointment);

  const [creatorOpen, setCreatorOpen] = React.useState(false);
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

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

  function handleCreateSubmitted() {
    setCreatorOpen(false);
    dispatch(loadAppointments());
  }

  function handleEditSubmitted() {
    setEditorOpen(false);
    dispatch(loadAppointments());
  }

  const handleDelete = React.useCallback(
    throttle(async () => {
      await dispatch(deleteAppointment(selectedAppointment.id));
      dispatch(loadAppointments());
    }, 500),
    [selectedAppointment],
  );

  return (
    <ClickAwayListener
      onClickAway={() => dispatch(setSelectedAppointment(null))}
    >
      <Paper>
        <BusyScreen isBusy={busy}>
          <ToolBar
            isAppointmentSelected={Boolean(selectedAppointment)}
            onCreateOpenClick={() => setCreatorOpen(true)}
            onViewOpenClick={() => setViewerOpen(true)}
            onEditOpenClick={() => setEditorOpen(true)}
            onDeleteClick={handleDelete}
          />

          <Table
            columns={columns}
            rows={appointments}
            pagination={pagination}
            sorting={sorting}
            selectedRow={selectedAppointment}
            onSelectedRowChange={(appointment) =>
              dispatch(setSelectedAppointment(appointment))
            }
            onSortRequest={handleSortRequest}
            onCurrentPageChange={handleCurrentPageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          {creatorOpen && (
            <AppointmentCreator
              onSubmitted={handleCreateSubmitted}
              onClose={() => setCreatorOpen(false)}
            />
          )}

          {viewerOpen && (
            <AppointmentViewer
              appointmentId={selectedAppointment.id}
              onClose={() => setViewerOpen(false)}
            />
          )}

          {editorOpen && (
            <AppointmentEditor
              appointmentId={selectedAppointment.id}
              onSubmitted={handleEditSubmitted}
              onClose={() => setEditorOpen(false)}
            />
          )}
        </BusyScreen>
      </Paper>
    </ClickAwayListener>
  );
}
