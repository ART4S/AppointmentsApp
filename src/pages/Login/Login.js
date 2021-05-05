/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React, { useReducer } from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  makeStyles,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

import authService from "services/authService";

const EMAIL = "Электронная почта";
const PASSWORD = "Пароль";
const REMEMBER = "Запомнить";
const LOGIN = "Войти";
const FORGOT_PASSWORD = "Забыли пароль?";
const SIGNIN = "Вход";
const SIGNUP = "Регистрация";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  avatar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary,
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginTop: theme.spacing(10),
  },

  title: {
    marginTop: theme.spacing(2),
  },

  icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    "& > *": {
      marginTop: theme.spacing(2),
    },
  },

  links: {
    display: "flex",
    justifyContent: "space-between",
  },

  copyright: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(10),
  },
}));

const initialState = {
  login: "",
  password: "",
  remember: false,
};

const { reducer, actions } = createSlice({
  name: "login",

  initialState,

  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },

    setPassword(state, action) {
      state.password = action.payload;
    },

    setRemember(state, action) {
      state.remember = action.payload;
    },
  },
});

const { setLogin, setPassword, setRemember } = actions;

export default function Login() {
  const classes = useStyles();
  const [{ login, password, remember }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function handleEmailChange(event) {
    dispatch(setLogin(event.target.value));
  }

  function handlePasswordChange(event) {
    dispatch(setPassword(event.target.value));
  }

  function handleRememberChecked(event) {
    dispatch(setRemember(event.target.checked));
  }

  return (
    <Container className={classes.root} maxWidth="xs" disableGutters fixed>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon className={classes.icon} />
      </Avatar>

      <Typography className={classes.title} variant="h5">
        {SIGNIN}
      </Typography>

      <form className={classes.form} noValidate>
        <TextField
          className={classes.control}
          id="email"
          variant="outlined"
          label={EMAIL}
          value={login}
          onChange={handleEmailChange}
          fullWidth
          required
        />

        <TextField
          className={classes.control}
          id="password"
          variant="outlined"
          type="password"
          label={PASSWORD}
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          required
        />

        <FormControlLabel
          className={classes.label}
          label={REMEMBER}
          control={
            <Checkbox
              color="primary"
              checked={remember}
              onChange={handleRememberChecked}
            />
          }
        />

        <Button variant="contained" color="primary">
          {LOGIN}
        </Button>

        <Box className={classes.links}>
          <Link>
            <Typography>{FORGOT_PASSWORD}</Typography>
          </Link>
          <Link>
            <Typography>{SIGNUP}</Typography>
          </Link>
        </Box>
      </form>

      <Box className={classes.copyright}>
        <Typography variant="body2" color="textSecondary">
          {"Copyright © "}
          <Link color="inherit">Appointments App</Link>
          {" 2021"}
        </Typography>
      </Box>
    </Container>
  );
}
