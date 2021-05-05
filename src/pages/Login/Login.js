/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

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
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";

import useAuth from "common/hooks/useAuth";

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

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const classes = useStyles();
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleRememberChecked(event) {
    setRemember(event.target.checked);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSignIn() {
    await auth.login(email, password);

    const from = location.state?.from?.pathname ?? "/";

    history.replace(from);

    setEmail("");
    setPassword("");
    setRemember(false);
    setShowPassword(false);
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
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
        />

        <TextField
          className={classes.control}
          id="password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          label={PASSWORD}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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

        <Button variant="contained" color="primary" onClick={handleSignIn}>
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
