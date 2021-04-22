import React from "react";

import Header from "components/Header";

import {
  Container,
  Box,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";

import { AppointmentIcon } from "assets/icons.js";

const TITLE = "Домашняя";

const navigationItems = [{ title: "Приемы", Icon: AppointmentIcon }];

const NavigationItem = (props) => {
  const { title, Icon } = props;

  return (
    <Box
      borderColor="primary.main"
      border={2}
      color="primary.main"
      width={100}
      height={100}
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      borderRadius={10}
    >
      <Icon width={100} />
      <Typography variant="caption">{title}</Typography>
    </Box>
  );
};

const NavigationPanel = () => {
  const items = navigationItems.map((x) => (
    <NavigationItem key={x.title} {...x} />
  ));

  return <Grid container>{items}</Grid>;
};

const Home = () => {
  return (
    <Container>
      <Header Icon={AppointmentIcon} title={TITLE} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        style={{ border: "2px dashed" }}
      >
        <NavigationPanel />
      </Box>
    </Container>
  );
};

export default Home;
