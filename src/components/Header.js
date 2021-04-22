import { Button, Box, Typography, makeStyles } from "@material-ui/core";

const CURRENT_USER = "Чулец Вячеслав Анатольевич";

const useStyles = makeStyles((theme) => ({
  header: {},
  page: {},
  icon: {
    width: 50,
    height: 50,
  },
}));

const Header = ({ title, Icon }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      bgcolor="primary.main"
      color="primary.contrastText"
    >
      <Box>
        <Icon className={classes.icon} />
        <Typography variant="h3">{title}</Typography>
      </Box>

      <Box>
        <Typography variant="caption">{CURRENT_USER}</Typography>
        <Button variant="contained" color="primary">
          Выйти
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
