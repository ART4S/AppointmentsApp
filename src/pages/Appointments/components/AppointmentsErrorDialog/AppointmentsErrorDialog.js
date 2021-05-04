import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorDialog from "common/components/ErrorDialog/ErrorDialog";
import {
  selectAppointmentsError,
  selectShouldReload,
  setShouldReload,
} from "../AppointmentsTable/appointmentsTableSlice";

const ERROR_TITLE = "Ошибка";
const ERROR_MESSAGE =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

export default function AppointmentsErrorDialog() {
  const dispatch = useDispatch();
  const hasError = useSelector(selectAppointmentsError);
  const shouldReload = useSelector(selectShouldReload);

  function handleEnter() {
    setTimeout(() => {
      dispatch(setShouldReload(true));
    }, 3000);
  }

  return (
    <ErrorDialog
      title={ERROR_TITLE}
      text={ERROR_MESSAGE}
      open={hasError && !shouldReload}
      onEnter={handleEnter}
    />
  );
}
