import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Box, Container, withStyles } from "@material-ui/core";
import moment from "moment";

import appointmentsListActions from "redux/appointments/list/actions";
import appointmentStatusesActions from "redux/dictionaries/appointmentStatuses/actions";
import { getAppointments, getFilter } from "redux/appointments/list/selectors";

import Header from "components/Header/Header";
import FilterForm from "components/FilterForm/FilterForm";
import Table from "components/Table/Table";

import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

const TITLE = "Приемы";

const styles = (theme) => ({
  root: {},
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    maxWidth: 800,
    margin: "auto",
  },
});

const columns = [
  {
    field: "date",
    header: "Дата",
    formatter: (d) => moment(d).format("DD.MM.YYYY"),
  },
  { field: "clientName", header: "Клиент" },
  { field: "status", header: "Статус" },
  { field: "holderName", header: "Принимающий" },
  { field: "compliences", header: "Жалобы" },
  { field: "diagnosis", header: "Диагноз" },
];

class Appointments extends React.Component {
  get actions() {
    return this.props.actions;
  }

  componentDidMount() {
    this.actions.load();
    this.actions.dictionaries.appointmentStatuses.load();
  }

  handleFilterChange = (name, value) => {
    this.actions.setFilterValue(name, value);
  };

  handleOnSearch = () => {
    this.actions.load(this.props.filter);
  };

  render() {
    const { classes, appointments } = this.props;

    return (
      <Box className={classes.root}>
        <Header title={TITLE} Icon={AppointmentIcon} />

        <Container maxWidth="md">
          <Box mt={5}>
            <FilterForm
              onFilterChange={this.handleFilterChange}
              onSearch={this.handleOnSearch}
            />
          </Box>

          <Box mt={5}>
            <Table columns={columns} rows={appointments} />
          </Box>
        </Container>

        {/* <Box className={classes.body}>
          <FilterForm onFilterChange={handleFilterChange} />
  
          <Table columns={columns} rows={data} />
        </Box> */}
      </Box>
    );
  }
}

function mapState(state) {
  return {
    appointments: getAppointments(state),
    filter: getFilter(state),
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      ...bindActionCreators(appointmentsListActions, dispatch),
      dictionaries: {
        appointmentStatuses: {
          ...bindActionCreators(appointmentStatusesActions, dispatch),
        },
      },
    },
  };
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Appointments));
