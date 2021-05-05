/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";

import Header from "common/components/Header/Header";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import { ReactComponent as HouseIcon } from "assets/icons/house.svg";
import { ReactComponent as ClientsIcon } from "assets/icons/clients.svg";
import { ReactComponent as MessagesIcon } from "assets/icons/messages.svg";
import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";
import { ReactComponent as EmployeesIcon } from "assets/icons/employees.svg";
import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

const HOME_PAGE = "Домашняя";
const APPOINTMENTS = "Приемы";
const EVENTS = "События";
const NOTIFICATIONS = "Оповещения";
const MESSAGES = "Сообщения";
const CLIENTS = "Клиенты";
const EMPLOYEES = "Сотрудники";

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
    width: theme.spacing(22),
    height: theme.spacing(22),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },

  icon: {
    fill: theme.palette.primary.main,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },

  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));

function NavigationItem({ title, Icon, link }) {
  const classes = useStyles();

  return (
    <Link to={link} className={classes.link}>
      <Box className={classes.navigationItem}>
        <Icon className={classes.icon} />
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Link>
  );
}

const navigationItems = [
  { title: APPOINTMENTS, Icon: AppointmentIcon, link: "/appointments" },
  { title: EVENTS, Icon: StarIcon, link: "/events" },
  { title: NOTIFICATIONS, Icon: BroadcastIcon, link: "/notifications" },
  { title: MESSAGES, Icon: MessagesIcon, link: "/messages" },
  { title: CLIENTS, Icon: ClientsIcon, link: "/clients" },
  { title: EMPLOYEES, Icon: EmployeesIcon, link: "/employees" },
];

function NavigationPanel() {
  const spacing = 2;

  return (
    <Grid
      container
      direction="column"
      spacing={spacing}
      style={{ width: "fit-content" }}
    >
      <Grid item container spacing={spacing}>
        {navigationItems.slice(0, 3).map((x) => (
          <Grid key={x.title} item>
            <NavigationItem {...x} />
          </Grid>
        ))}
      </Grid>

      <Grid item container spacing={spacing}>
        {navigationItems.slice(3, 6).map((x) => (
          <Grid key={x.title} item>
            <NavigationItem {...x} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <Header Icon={HouseIcon} title={HOME_PAGE} />

      <Box className={classes.body}>
        <NavigationPanel />
      </Box>
    </Box>
  );
}
