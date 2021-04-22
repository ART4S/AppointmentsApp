import { Button, Box, Typography, makeStyles } from "@material-ui/core";

const CURRENT_USER = "Чулец Вячеслав Анатольевич";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  page: {},
  icon: {
    fill: theme.palette.primary.contrastText,
    width: 50,
    height: 50,
  },
}));

const Header = ({ title, Icon }) => {
  const classes = useStyles();

  return (
    <Box className={classes.header}>
      <Box>
        <Icon className={classes.icon} />
        <Typography variant="h3">{title}</Typography>
      </Box>

      <Box>
        <Typography variant="h5">{CURRENT_USER}</Typography>
        <Button variant="contained" color="primary">
          Выйти
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
