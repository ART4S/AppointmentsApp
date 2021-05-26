import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container, makeStyles } from "@material-ui/core";

import { ReactComponent as BroadcastIcon } from "assets/icons/broadcast.svg";

import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";

import NotificationsTable from "./NotificationsTable/NotificationsTable";

import { selectError } from "./NotificationsTable/notificationsTableSlice";

const NOTIFICATIONS = "Уведомления";
const ERROR_LOAD_DATA =
  "В процессе загрузки данных произошла ошибка, пожалуйста перезагрузите страницу";

const SPACING = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  body: {
    marginTop: theme.spacing(SPACING),
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export default function Notifications() {
  const classes = useStyles();
  const error = useSelector(selectError);

  return (
    <div className={classes.root}>
      <Header title={NOTIFICATIONS} Icon={BroadcastIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <NotificationsTable />
          </Grid>
        </Grid>
      </Container>

      {error && <ErrorPopup text={ERROR_LOAD_DATA} />}
    </div>
  );
}
