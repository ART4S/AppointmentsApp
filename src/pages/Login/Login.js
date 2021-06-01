/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from "formik";
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
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import useAuth from "common/hooks/useAuth";
import useLocalization from "common/hooks/useLocalization";

const useCopyrightStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Copyright() {
  const classes = useCopyrightStyles();
  const l = useLocalization();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary">
        {`© ${l("login.copyright")} ${new Date().getFullYear()} `}
        <Link className={classes.link} color="inherit">
          Appointments app
        </Link>
      </Typography>
    </div>
  );
}

const useLinksStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  typo: {
    pointerEvents: "none",
  },
}));

function Links() {
  const classes = useLinksStyles();
  const l = useLocalization();

  return (
    <div className={classes.root}>
      <Link className={classes.link}>
        <Typography className={classes.typo}>
          {l("login.forgotPassword")}
        </Typography>
      </Link>

      <Link className={classes.link}>
        <Typography className={classes.typo}>{l("login.signUp")}</Typography>
      </Link>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
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
}));

export default function Login() {
  const [remember, setRemember] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const classes = useStyles();
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const l = useLocalization();

  const schema = yup.object({
    email: yup
      .string()
      .email(l("validation.correctEmail"))
      .required(l("validation.required")),
    password: yup.string().required(l("validation.required")),
  });

  React.useEffect(() => {
    if (auth.user) {
      history.replace(location.state?.from?.pathname ?? "/");
    }
  }, [auth.user, location, history]);

  const initialValues = {
    email: "",
    password: "",
  };

  async function handleSubmit({ email, password }, { setSubmitting }) {
    await auth.login(email, password);
    setSubmitting(false);
  }

  return (
    <Container className={classes.root} maxWidth="xs" disableGutters fixed>
      <Box mt={10}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
      </Box>

      <Box mt={2}>
        <Typography variant="h5">{l("login.signIn")}</Typography>
      </Box>

      {auth.error && (
        <Alert severity="error" style={{ width: "100%" }}>
          {auth.error}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className={classes.form}>
            <TextField
              fullWidth
              className={classes.control}
              id="email"
              name="email"
              variant="outlined"
              label={l("login.email")}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              disabled={isSubmitting}
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{ onBlur: handleBlur }}
            />

            <TextField
              fullWidth
              className={classes.control}
              id="password"
              name="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              label={l("login.password")}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              disabled={isSubmitting}
              onBlur={handleBlur}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      disabled={isSubmitting}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              id="remember"
              name="remember"
              className={classes.label}
              label={l("login.rememberMe")}
              disabled={isSubmitting}
              control={
                <Checkbox
                  color="primary"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
              }
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {l("login.signIn").toUpperCase()}
            </Button>
          </Form>
        )}
      </Formik>

      <Box mt={2} width="100%">
        <Links />
      </Box>

      <Box mt={10}>
        <Copyright />
      </Box>
    </Container>
  );
}
