import React from "react";

import { Button } from "@material-ui/core";

import { ReactComponent as Appointment } from "assets/images/appointment.svg";

import styles from "./Home.module.scss";

const TITLE = "Домашняя";
const CURRENT_USER = "Чулец Вячеслав Анатольевич";

const Header = ({ title, Icon }) => {
  return (
    <div className={styles.header}>
      <div>
        <Icon className={styles.icon} />
        <h1>{title}</h1>
      </div>

      <div>
        <h3>{CURRENT_USER}</h3>
        <Button variant="contained" color="primary">
          Выйти
        </Button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className={styles.page}>
      <Header Icon={Appointment} title={TITLE} />
    </div>
  );
};

export default Home;
