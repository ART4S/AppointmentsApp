import { Link } from "react-router-dom";
import { Box, Typography, makeStyles } from "@material-ui/core";

import useLocalization from "common/hooks/useLocalization";

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
  const l = useLocalization();

  return (
    <Box className={classes.page}>
      <Typography className={classes.title} variant="h1">
        {l("notFoundPage.title")}
      </Typography>

      <Link className={classes.link} to="/">
        <Typography>{l("notFoundPage.backToHomePage")}</Typography>
      </Link>
    </Box>
  );
}
