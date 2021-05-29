import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import { Box, Typography, IconButton, makeStyles } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import useAuth from "common/hooks/useAuth";

import LangPicker from "../LangPicker/LangPicker";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 0),
  },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
  icon: {
    fill: theme.palette.common.white,
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

  return (
    <div className={classes.header}>
      <Link className={classes.link} to="/">
        <Icon className={classes.icon} />
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
      </Link>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Link className={cn(classes.link, classes.profile)} to="/profile">
          <Typography variant="h5">
            {`${auth.user.firstName} ${auth.user.lastName}`}
          </Typography>

          <AccountCircleIcon className={classes.icon} />
        </Link>

        <IconButton onClick={() => auth.logout()}>
          <ExitToAppIcon className={classes.icon} />
        </IconButton>

        <LangPicker />
      </Box>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
