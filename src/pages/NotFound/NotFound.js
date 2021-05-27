import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography, makeStyles } from "@material-ui/core";

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
  const { t } = useTranslation();

  return (
    <Box className={classes.page}>
      <Typography className={classes.title} variant="h1">
        {t("pageNotFound")}
      </Typography>

      <Link className={classes.link} to="/">
        <Typography>{t("backToHomePage")}</Typography>
      </Link>
    </Box>
  );
}
