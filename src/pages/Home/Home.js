/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";

import Header from "common/components/Header/Header";

import { ReactComponent as HouseIcon } from "assets/icons/house.svg";

import NavigationPanel from "./NavigationPanel/NavigationPanel";

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
  const { t } = useTranslation();

  return (
    <div>
      <Header Icon={HouseIcon} title={t("home.page")} />

      <div className={classes.body}>
        <NavigationPanel />
      </div>
    </div>
  );
}
