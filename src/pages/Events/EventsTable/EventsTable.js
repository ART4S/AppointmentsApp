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
  loadEvents,
  setBusy,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedEvent,
  selectEvents,
  selectSorting,
  selectPagination,
  selectEvent,
  selectBusy,
} from "./eventsTableSlice";

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
    field: "name",
    header: "Наименование",
    enableSort: true,
  },
  {
    field: "authorName",
    header: "Автор",
    enableSort: true,
  },
];

export default function EventsTable() {
  const dispatch = useDispatch();
  const busy = useSelector(selectBusy);
  const events = useSelector(selectEvents);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedEvent = useSelector(selectEvent);

  const [creatorOpen, setCreatorOpen] = React.useState(false);
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(loadEvents());
  }, []);

  function handleSortRequest(order, field) {
    dispatch(setSorting({ order, field }));
    dispatch(loadEvents());
  }

  function handleCurrentPageChange(newPage) {
    dispatch(setCurrentPage(newPage));
    dispatch(loadEvents());
  }

  function handleItemsPerPageChange(newItemsPerPage) {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(0));
    dispatch(loadEvents());
  }

  return (
    <ClickAwayListener onClickAway={() => dispatch(setSelectedEvent(null))}>
      <Paper>
        <BusyScreen isBusy={busy}>
          <ToolBar
            isAppointmentSelected={Boolean(selectedEvent)}
            onCreateOpenClick={() => setCreatorOpen(true)}
            onViewOpenClick={() => setViewerOpen(true)}
            onEditOpenClick={() => setEditorOpen(true)}
          />

          <Table
            columns={columns}
            rows={events}
            pagination={pagination}
            sorting={sorting}
            selectedRow={selectedEvent}
            onSelectedRowChange={(event) => dispatch(setSelectedEvent(event))}
            onSortRequest={handleSortRequest}
            onCurrentPageChange={handleCurrentPageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </BusyScreen>
      </Paper>
    </ClickAwayListener>
  );
}
