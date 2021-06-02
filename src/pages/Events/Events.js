import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container, makeStyles } from "@material-ui/core";

import { ReactComponent as StarIcon } from "assets/icons/star.svg";
import Header from "common/components/Header/Header";
import ErrorPopup from "common/components/ErrorPopup/ErrorPopup";
import useLocalization from "common/hooks/useLocalization";
import Breadcrumbs from "common/components/Breadcrumbs/Breadcrumbs";
import EventsTable from "./EventsTable/EventsTable";
import { selectError } from "./EventsTable/eventsTableSlice";

const SPACING = 2;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.breakpoints.values.md,
  },
  body: {
    marginTop: theme.spacing(SPACING),
  },
}));

export default function Events() {
  const classes = useStyles();
  const error = useSelector(selectError);
  const l = useLocalization();

  return (
    <div className={classes.root}>
      <Header title={l("events.page")} Icon={StarIcon} />

      <Container className={classes.body} maxWidth="md">
        <Grid item container direction="column" spacing={SPACING}>
          <Grid item xs>
            <Breadcrumbs
              pages={[
                { name: l("events.home"), to: "/" },
                { name: l("events.page") },
              ]}
            />
          </Grid>

          <Grid item xs>
            <EventsTable />
          </Grid>
        </Grid>
      </Container>

      {error && <ErrorPopup text={l("errors.loadData")} />}
    </div>
  );
}
