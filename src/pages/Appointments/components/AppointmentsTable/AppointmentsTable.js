/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper, ClickAwayListener } from "@material-ui/core";

import Table from "common/components/Table/Table";
import TableToolbar from "common/components/TableToolbar/TableToolBar";
import BusyScreen from "common/components/BusyScreen/BusyScreen";
import useLocalization from "common/hooks/useLocalization";
import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedAppointment,
  deleteAppointment,
  selectAppointments,
  selectSorting,
  selectPagination,
  selectAppointment,
  selectBusy,
} from "./appointmentsTableSlice";
import AppointmentCreator from "../AppointmentCreator/AppointmentCreator";
import AppointmentViewer from "../AppointmentViewer/AppointmentViewer";
import AppointmentEditor from "../AppointmentEditor/AppointmentEditor";

export default function AppointmentsTable() {
  const dispatch = useDispatch();
  const l = useLocalization();
  const busy = useSelector(selectBusy);
  const appointments = useSelector(selectAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedAppointment = useSelector(selectAppointment);

  const [creatorOpen, setCreatorOpen] = React.useState(false);
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  const columns = [
    {
      field: "date",
      header: l("appointments.table.date"),
      enableSort: true,
      formatter: (d) => moment(d).format("DD.MM.YYYY"),
    },
    {
      field: "status",
      header: l("appointments.table.status"),
      enableSort: true,
      formatter: (s) => l(`model.appointmentStatuses.${s}`),
    },
    {
      field: "clientName",
      header: l("appointments.table.client"),
      enableSort: true,
    },
    {
      field: "holderName",
      header: l("appointments.table.holder"),
      enableSort: true,
    },
    { field: "complaints", header: l("appointments.table.complaints") },
    { field: "diagnosis", header: l("appointments.table.diagnosis") },
  ];

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

  function handleDelete() {
    dispatch(deleteAppointment(selectedAppointment.id));
  }

  function createRow(appointment) {
    return { key: appointment.id, visited: true, data: appointment };
  }

  return (
    <ClickAwayListener
      onClickAway={() => dispatch(setSelectedAppointment(null))}
    >
      <Paper>
        <BusyScreen isBusy={busy}>
          <TableToolbar
            isItemSelected={Boolean(selectedAppointment)}
            onCreateClick={() => setCreatorOpen(true)}
            onViewClick={() => setViewerOpen(true)}
            onEditClick={() => setEditorOpen(true)}
            onDeleteClick={handleDelete}
          />

          <Table
            columns={columns}
            rows={appointments.map(createRow)}
            pagination={pagination}
            sorting={sorting}
            selectedRow={selectedAppointment && createRow(selectedAppointment)}
            onSelectedRowChange={({ data: appointment }) =>
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
