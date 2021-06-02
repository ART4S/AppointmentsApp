import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container, makeStyles } from "@material-ui/core";

import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";

import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import useLocalization from "common/hooks/useLocalization";
import Breadcrumbs from "common/components/Breadcrumbs/Breadcrumbs";
import NotificationsTable from "./NotificationsTable/NotificationsTable";
import { selectError } from "./NotificationsTable/notificationsTableSlice";

const SPACING = 2;

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
            <Breadcrumbs
              pages={[
                { name: l("notifications.home"), to: "/" },
                { name: l("notifications.page") },
              ]}
            />
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
