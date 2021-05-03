import { Link } from "react-router-dom";
import { Box, Typography, makeStyles, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const CURRENT_USER = "Чулец Вячеслав Анатольевич";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: 20,
    paddingBottom: 20,
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

  accountButton: {
    marginLeft: theme.spacing(3),
  },

  title: {
    marginLeft: theme.spacing(3),
  },
}));

export default function Header({ title, Icon }) {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Link to="/home" className={classes.link}>
        <Icon className={classes.icon} />
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>
      </Link>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5">{CURRENT_USER}</Typography>

        <IconButton>
          <AccountCircleIcon className={classes.icon} />
        </IconButton>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
