import { Box, Container, Tooltip, IconButton } from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import Header from "common/components/Header/Header";

import AppointmentsAccordion from "./components/AppointmentsAccordion/AppointmentsAccordion";
import AppointmentsFilters from "./components/AppointmentsFilters/AppointmentsFilters";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";

import AppointmentsErrorDialog from "./components/AppointmentsErrorDialog/AppointmentsErrorDialog";

const HEADER_TITLE = "Приемы";

const FILTERS_TOOLTIP = "Фильтры";

export default function Appointments() {
  return (
    <Box>
      <Header title={HEADER_TITLE} Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <AppointmentsAccordion
            header={
              <Tooltip title={FILTERS_TOOLTIP}>
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

      <AppointmentsErrorDialog />
    </Box>
  );
}
