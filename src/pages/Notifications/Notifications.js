import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Container,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";

import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import RouterLink from "common/components/RouterLink/RouterLink";
import useLocalization from "common/hooks/useLocalization";
import NotificationsTable from "./NotificationsTable/NotificationsTable";
import { selectError } from "./NotificationsTable/notificationsTableSlice";

const SPACING = 2;

function Breadcrumbs() {
  const l = useLocalization();

  return (
    <MuiBreadcrumbs>
      <RouterLink to="/">
        <Typography color="textSecondary">{l("notifications.home")}</Typography>
      </RouterLink>

      <Typography color="textPrimary" style={{ cursor: "default" }}>
        {l("notifications.page")}
      </Typography>
    </MuiBreadcrumbs>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  body: {
    marginTop: theme.spacing(SPACING),
  },
}));

export default function Notifications() {
  const classes = useStyles();
  const l = useLocalization();
  const error = useSelector(selectError);

  return (
    <div className={classes.root}>
      <Header title={l("notifications.page")} Icon={BroadcastIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <Breadcrumbs />
          </Grid>

          <Grid item xs>
            <NotificationsTable />
          </Grid>
        </Grid>
      </Container>

      {error && <ErrorPopup text={l("errors.loadData")} />}
    </div>
  );
}
