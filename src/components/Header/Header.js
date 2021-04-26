import { Link } from "react-router-dom";
import { Button, Box, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

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
  },
}));

export default function Header({ title, Icon }) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Link to="/home" className={classes.link}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Icon className={classes.icon} />
          <Typography variant="h3">{title}</Typography>
        </Box>
      </Link>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5">{CURRENT_USER}</Typography>

        <Button variant="contained" color="primary">
          Выйти
        </Button>
      </Box>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
