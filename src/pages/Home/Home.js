import React from "react";

import { Link } from "react-router-dom";

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
  { title: "Приёмы", Icon: AppointmentIcon, href: "/appointments" },
  { title: "События", Icon: StarIcon, href: "/" },
  { title: "Оповещения", Icon: BroadcastIcon, href: "/" },
  { title: "Сообщения", Icon: MessagesIcon, href: "/" },
  { title: "Клиенты", Icon: ClientsIcon, href: "/" },
  { title: "Сотрудники", Icon: EmployeesIcon, href: "/" },
];

const styles = (theme) => ({
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

  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
});

const useStyles = makeStyles(styles);

function NavigationItem({ title, Icon, href }) {
  const classes = useStyles();

  return (
    <Link to={href} className={classes.link}>
      <Box className={classes.navigationItem}>
        <Icon className={classes.icon} />
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Link>
  );
}

function NavigationPanel() {
  const classes = useStyles();

  return (
    <div className={classes.navigationPanel}>
      <Grid container spacing={1} justify="center">
        {NAVIGATION_ITEMS.map((item, index) => (
          <Grid key={index} item>
            <NavigationItem {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Header Icon={HouseIcon} title={TITLE} />

      <div className={classes.body}>
        <NavigationPanel />
      </div>
    </div>
  );
}
