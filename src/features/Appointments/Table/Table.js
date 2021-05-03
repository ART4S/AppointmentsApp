import CustomTable from "components/Table/Table";

import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loadAppointments,
  setSorting,
  setCurrentPage,
  setItemsPerPage,
  selectAllAppointments,
  selectSorting,
  selectPagination,
} from "./tableSlice";

const columns = [
  {
    field: "date",
    header: "Дата",
    formatter: (d) => moment(d).format("DD.MM.YYYY"),
  },
  { field: "clientName", header: "Клиент" },
  { field: "status", header: "Статус" },
  { field: "holderName", header: "Принимающий" },
  { field: "complaints", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

export default function Table() {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAllAppointments);
  const sorting = useSelector(selectSorting);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
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
    <CustomTable
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
