import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Box, Container, withStyles } from "@material-ui/core";
import moment from "moment";

import appointmentsListActions from "redux/appointments/list/actions";
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
  componentDidMount() {
    this.props.actions.load();
  }

  handleFilterChange = (name, value) => {
    this.props.actions.setFilterValue(name, value);
  };

  handleOnSearch = () => {
    const { actions, filter } = this.props;

    actions.load(filter);
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

const mapState = (state) => ({
  appointments: getAppointments(state),
  filter: getFilter(state),
});

const mapDispatch = (dispatch) => ({
  actions: {
    ...bindActionCreators(appointmentsListActions, dispatch),
  },
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Appointments));
