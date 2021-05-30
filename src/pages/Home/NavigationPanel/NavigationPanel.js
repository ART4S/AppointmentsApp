/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import { ReactComponent as ClientsIcon } from "assets/icons/clients.svg";
import { ReactComponent as MessagesIcon } from "assets/icons/messages.svg";
import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";
import { ReactComponent as EmployeesIcon } from "assets/icons/employees.svg";
import { ReactComponent as AppointmentIcon } from "assets/icons/appointment.svg";

import RouterLink from "common/components/RouterLink/RouterLink";
import Badge from "common/components/Badge/Badge";
import useLocalization from "common/hooks/useLocalization";
import { eventService } from "services";

const SPACING = 3;

const useNavigationItemStyles = makeStyles((theme) => ({
  item: {
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
    padding: theme.spacing(3),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.action.hover,
    },
  },
  icon: {
    fill: theme.palette.primary.main,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function NavigationItem({ title, Icon, link, badgeContent }) {
  const classes = useNavigationItemStyles();

  return (
    <Badge content={badgeContent}>
      <RouterLink to={link}>
        <div className={classes.item}>
          <Icon className={classes.icon} />
          <Typography variant="h5">{title}</Typography>
        </div>
      </RouterLink>
    </Badge>
  );
}

NavigationItem.defaultProps = {
  badgeContent: 0,
};

export default function NavigationPanel() {
  const l = useLocalization();

  const [newEventsCount, setNewEventsCount] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    (async () => {
      const count = await eventService.getNewCount();
      if (active) {
        setNewEventsCount(count);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const navigationItems = [
    {
      title: l("home.appointments"),
      Icon: AppointmentIcon,
      link: "/appointments",
    },
    {
      title: l("home.events"),
      Icon: StarIcon,
      link: "/events",
      badgeContent: newEventsCount,
    },
    {
      title: l("home.notifications"),
      Icon: BroadcastIcon,
      link: "/notifications",
    },
    {
      title: l("home.messages"),
      Icon: MessagesIcon,
      link: "/messages",
    },
    { title: l("home.clients"), Icon: ClientsIcon, link: "/clients" },
    { title: l("home.employees"), Icon: EmployeesIcon, link: "/employees" },
  ];

  return (
    <div>
      <Grid container direction="column" spacing={SPACING} wrap="nowrap">
        <Grid item container spacing={SPACING}>
          {navigationItems.slice(0, 3).map((navItem) => (
            <Grid item key={navItem.title}>
              <NavigationItem {...navItem} />
            </Grid>
          ))}
        </Grid>

        <Grid item container spacing={SPACING} wrap="nowrap">
          {navigationItems.slice(3, 6).map((navItem) => (
            <Grid item key={navItem.title}>
              <NavigationItem {...navItem} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
