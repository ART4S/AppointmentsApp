/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Table from "common/components/Table/Table";

import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  selectAllAppointments,
  selectSorting,
  selectPagination,
} from "./appointmentsTableSlice";

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

  return (
    <Table
      columns={columns}
      rows={appointments}
      pagination={pagination}
      sorting={sorting}
      onSortRequest={handleSortRequest}
      onCurrentPageChange={handleCurrentPageChange}
      onItemsPerPageChange={handleItemsPerPageChange}
    />
  );
}
