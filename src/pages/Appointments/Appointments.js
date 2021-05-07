import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Tooltip, IconButton } from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import Header from "common/components/Header/Header";
import ErrorDialog from "common/components/ErrorDialog/ErrorDialog";
import AppointmentsAccordion from "./components/AppointmentsAccordion/AppointmentsAccordion";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";

import { selectAppointmentsError } from "./components/AppointmentsTable/appointmentsTableSlice";

const APPOINTMENTS = "Приемы";
const FILTERS = "Фильтры";
const ERROR = "Ошибка";
const ERROR_LOAD_DATA =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

export default function Appointments() {
  const hasError = useSelector(selectAppointmentsError);

  return (
    <Box>
      <Header title={APPOINTMENTS} Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <AppointmentsAccordion
            header={
              <Tooltip title={FILTERS}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <AppointmentsFilters />
          </AppointmentsAccordion>
        </Box>

        <Box mt={5}>
          <AppointmentsTable />
        </Box>
      </Container>

      {hasError && (
        <ErrorDialog title={ERROR} text={ERROR_LOAD_DATA} delaySeconds={3} />
      )}
    </Box>
  );
}
