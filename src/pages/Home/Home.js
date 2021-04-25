import React from "react";

import { Box, Grid, Typography, makeStyles } from "@material-ui/core";

import Header from "components/Header/Header";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import { ReactComponent as HouseIcon } from "assets/icons/house.svg";
import { ReactComponent as ClientsIcon } from "assets/icons/clients.svg";
import { ReactComponent as MessagesIcon } from "assets/icons/messages.svg";
import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";
import { ReactComponent as EmployeesIcon } from "assets/icons/employees.svg";
import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

const TITLE = "Домашняя";

const NAVIGATION_ITEMS = [
  { title: "Приёмы", Icon: AppointmentIcon },
  { title: "События", Icon: StarIcon },
  { title: "Оповещения", Icon: BroadcastIcon },
  { title: "Сообщения", Icon: MessagesIcon },
  { title: "Клиенты", Icon: ClientsIcon },
  { title: "Сотрудники", Icon: EmployeesIcon },
];

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  navigationPanel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  navigationItem: {
    border: "5px solid",
    borderRadius: 10,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    width: 130,
    height: 130,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  icon: {
    fill: theme.palette.primary.main,
  },
}));

const NavigationItem = (props) => {
  const { title, Icon } = props;
  const classes = useStyles();

  return (
    <Box className={classes.navigationItem}>
      <Icon className={classes.icon} />
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};

const NavigationPanel = () => {
  const classes = useStyles();

  const items = NAVIGATION_ITEMS.map((item) => (
    <Grid item key={item.title}>
      <NavigationItem {...item} />
    </Grid>
  ));

  return (
    <Box className={classes.navigationPanel}>
      <Grid container spacing={1} xs={8} justify="center">
        {items}
      </Grid>
    </Box>
  );
};

const Home = () => {
  const classes = useStyles();

  return (
    <Box>
      <Header Icon={HouseIcon} title={TITLE} />

      <Box className={classes.body}>
        <NavigationPanel />
      </Box>
    </Box>
  );
};

export default Home;
