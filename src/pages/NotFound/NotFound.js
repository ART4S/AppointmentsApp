import { Link } from "react-router-dom";
import { Box, Typography, makeStyles } from "@material-ui/core";

const NOT_FOUND = "Страница отсутствует";
const BACK_TO_HOMEPAGE = "Вернуться на домашнюю страницу";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
  },

  title: {
    fontSize: "5rem",
  },

  link: {
    textDecoration: "inherit",
    marginTop: theme.spacing(4),
    color: theme.palette.primary.main,
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <Typography className={classes.title} variant="h1">
        {NOT_FOUND}
      </Typography>

      <Link className={classes.link} to="/">
        <Typography>{BACK_TO_HOMEPAGE}</Typography>
      </Link>
    </Box>
  );
}
