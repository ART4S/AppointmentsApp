/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { makeStyles } from "@material-ui/core";

import Header from "common/components/Header/Header";

import { ReactComponent as HouseIcon } from "assets/icons/house.svg";

import NavigationPanel from "./NavigationPanel/NavigationPanel";

const HOME_PAGE = "Домашняя";

const useStyles = makeStyles((_theme) => ({
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Header Icon={HouseIcon} title={HOME_PAGE} />

      <div className={classes.body}>
        <NavigationPanel />
      </div>
    </div>
  );
}
