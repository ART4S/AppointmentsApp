import { Link } from "react-router-dom";
import { Box, Typography, IconButton, makeStyles } from "@material-ui/core";
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

import PropTypes from "prop-types";

import useAuth from "common/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 0),
  },

  icon: {
    fill: theme.palette.primary.contrastText,
    width: 50,
    height: 50,
  },

  link: {
    color: "inherit",
    textDecoration: "inherit",
    display: "flex",
    justifyContent: "center",
  },

  title: {
    marginLeft: theme.spacing(3),
  },
}));

export default function Header({ title, Icon }) {
  const classes = useStyles();
  const auth = useAuth();
  const userName = `${auth.user.firstName} ${auth.user.lastName}`;

  function handleLogout() {
    auth.logout();
  }

  return (
    <Box className={classes.header}>
      <Link className={classes.link} to="/">
        <Icon className={classes.icon} />
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
      </Link>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5">{userName}</Typography>

        <IconButton>
          <AccountCircleIcon className={classes.icon} />
        </IconButton>

        <IconButton onClick={handleLogout}>
          <ExitToAppIcon className={classes.icon} />
        </IconButton>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
