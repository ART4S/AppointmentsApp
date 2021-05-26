/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper, ClickAwayListener, useTheme } from "@material-ui/core";

import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ErrorIcon from "@material-ui/icons/Error";

import Table from "common/components/Table/Table";
import TableToolBar from "common/components/TableToolbar/TableToolBar";
import BusyScreen from "common/components/BusyScreen/BusyScreen";

import notificationTypes from "model/enums/notificationTypes";

import {
  loadNotifications,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  setSelectedNotification,
  selectNotifications,
  selectSorting,
  selectPagination,
  selectNotification,
  selectBusy,
} from "./notificationsTableSlice";

const NOTIFICATION_TYPE_ICONS = {
  [notificationTypes.info]: AnnouncementOutlinedIcon,
  [notificationTypes.warning]: PeopleAltIcon,
  [notificationTypes.emergency]: () => {
    const theme = useTheme();
    const color = theme.palette.error.main;
    return <ErrorIcon style={{ color }} />;
  },
};

const DATE_FORMAT = "DD.MM.YYYY";

const COLUMNS = [
  {
    field: "date",
    header: "Дата",
    enableSort: true,
    formatter: (d) => moment(d).format(DATE_FORMAT),
  },
  {
    field: "name",
    header: "Наименование",
    enableSort: true,
  },
  {
    field: "type",
    formatter: (t) => {
      const Icon = NOTIFICATION_TYPE_ICONS[t];
      return <Icon />;
    },
  },
];

export default function NotificationsTable() {
  const dispatch = useDispatch();
  const busy = useSelector(selectBusy);
  const notifications = useSelector(selectNotifications);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);
  const selectedNotification = useSelector(selectNotification);

  React.useEffect(() => {
    dispatch(loadNotifications());
  }, []);

  function handleSortRequest(order, field) {
    dispatch(setSorting({ order, field }));
    dispatch(loadNotifications());
  }

  function handleCurrentPageChange(newPage) {
    dispatch(setCurrentPage(newPage));
    dispatch(loadNotifications());
  }

  function handleItemsPerPageChange(newItemsPerPage) {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(0));
    dispatch(loadNotifications());
  }

  function handleSelectedRowChange({ data: notification }) {
    dispatch(setSelectedNotification(notification));
  }

  function createRow(notification) {
    return { key: notification.id, visited: true, data: notification };
  }

  return (
    <ClickAwayListener
      onClickAway={() => dispatch(setSelectedNotification(null))}
    >
      <Paper>
        <BusyScreen isBusy={busy}>
          <TableToolBar
            isItemSelected={Boolean(selectedNotification)}
            onCreateClick={() => {}}
            onViewClick={() => {}}
            onEditClick={() => {}}
          />

          <Table
            columns={COLUMNS}
            rows={notifications.map(createRow)}
            pagination={pagination}
            sorting={sorting}
            selectedRow={
              selectedNotification && createRow(selectedNotification)
            }
            onSelectedRowChange={handleSelectedRowChange}
            onSortRequest={handleSortRequest}
            onCurrentPageChange={handleCurrentPageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </BusyScreen>
      </Paper>
    </ClickAwayListener>
  );
}
