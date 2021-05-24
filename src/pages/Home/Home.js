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
    <Link className={classes.link} to={link}>
      <Box className={classes.navigationItem}>
        <Icon className={classes.icon} />
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Link>
  );
}

const NAVIGATION_ITEMS = [
  { title: APPOINTMENTS, Icon: AppointmentIcon, link: "/appointments" },
  { title: EVENTS, Icon: StarIcon, link: "/events" },
  { title: NOTIFICATIONS, Icon: BroadcastIcon, link: "/notifications" },
  { title: MESSAGES, Icon: MessagesIcon, link: "/messages" },
  { title: CLIENTS, Icon: ClientsIcon, link: "/clients" },
  { title: EMPLOYEES, Icon: EmployeesIcon, link: "/employees" },
];

const SPACING = 2;

function NavigationPanel() {
  return (
    <div>
      <Grid container direction="column" spacing={SPACING} wrap="nowrap">
        <Grid item container spacing={SPACING}>
          {NAVIGATION_ITEMS.slice(0, 3).map((navItem) => (
            <Grid item key={navItem.title}>
              <NavigationItem {...navItem} />
            </Grid>
          ))}
        </Grid>

        <Grid item container spacing={SPACING} wrap="nowrap">
          {NAVIGATION_ITEMS.slice(3, 6).map((navItem) => (
            <Grid item key={navItem.title}>
              <NavigationItem {...navItem} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Header Icon={HouseIcon} title={HOME_PAGE} />

      <div className={classes.body}>
        <NavigationPanel />
      </div>
    </div>
  );
}
