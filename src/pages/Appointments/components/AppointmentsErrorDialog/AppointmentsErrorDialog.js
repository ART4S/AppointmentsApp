import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorDialog from "common/components/ErrorDialog/ErrorDialog";
import {
  selectAppointmentsError,
  selectShouldReload,
  setShouldReload,
} from "../AppointmentsTable/appointmentsTableSlice";

const ERROR = "Ошибка";
const ERROR_LOAD_PAGE =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

export default function AppointmentsErrorDialog() {
  const hasError = useSelector(selectAppointmentsError);
  const shouldReload = useSelector(selectShouldReload);

  const dispatch = useDispatch();

  function handleEnter() {
    setTimeout(() => {
      dispatch(setShouldReload(true));
    }, 3000);
  }

  return (
    <ErrorDialog
      title={ERROR}
      text={ERROR_LOAD_PAGE}
      open={hasError && !shouldReload}
      onEnter={handleEnter}
    />
  );
}
