import {
  Box,
  Container,
  Tooltip,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

import Header from "components/Header/Header";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import Accordion from "./Accordion/Accordion";
import Filters from "./Filters/Filters";
import Table from "./Table/Table";

const useStyles = makeStyles((theme) => ({
  root: {},

  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    maxWidth: 800,
    margin: "auto",
  },
}));

export default function Appointments() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header title="Приемы" Icon={AppointmentIcon} />

      <Container maxWidth="md">
        <Box mt={5}>
          <Accordion
            header={
              <Tooltip title="Filters">
                <IconButton aria-label="filters">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <Filters />
          </Accordion>
        </Box>

        <Box mt={5}>
          <Table />
        </Box>
      </Container>
    </Box>
  );
}
