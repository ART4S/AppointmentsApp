import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  Switch,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import useAuth from "common/hooks/useAuth";
import useTheme from "common/hooks/useTheme";
import { useLocalizationContext } from "common/hooks/useLocalization";

const useCommonStyles = makeStyles((theme) => ({
  icon: {
    fill: theme.palette.common.white,
    width: 50,
    height: 50,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
    display: "flex",
    justifyContent: "center",
  },
}));

const useProfileLinkStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
    "&:hover": {
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.action.hover,
    },
  },
}));
function ProfileLink() {
  const classes = useProfileLinkStyles();
  const commonClasses = useCommonStyles();
  const auth = useAuth();

  return (
    <Link className={cn(classes.root, commonClasses.link)} to="/profile">
      <Typography variant="h5">
        {`${auth.user.firstName} ${auth.user.lastName}`}
      </Typography>

      <AccountCircleIcon className={commonClasses.icon} />
    </Link>
  );
}

const useLogoStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  title: {
    marginLeft: theme.spacing(3),
  },
}));

function Logo({ title, Icon }) {
  const classes = useLogoStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.logo}>
      <Icon className={commonClasses.icon} />

      <Typography className={classes.title} variant="h3">
        {title}
      </Typography>
    </div>
  );
}

function LogoutButton() {
  const commonClasses = useCommonStyles();
  const auth = useAuth();

  return (
    <IconButton onClick={() => auth.logout()}>
      <ExitToAppIcon className={commonClasses.icon} />
    </IconButton>
  );
}

const useLangPickerStyles = makeStyles((theme) => ({
  control: {
    "&:hover": {
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.action.hover,
    },
  },
  select: {
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

function LangPicker() {
  const classes = useLangPickerStyles();
  const { l, language, languages, setLanguage } = useLocalizationContext();

  return (
    <FormControl className={classes.control}>
      <Select
        className={classes.select}
        disableUnderline
        value={language}
        classes={{ icon: classes.icon }}
        label={l("home.lang")}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {Object.entries(languages).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const useThemeSwitchStyles = makeStyles((theme) => ({
  track: {
    backgroundColor: theme.palette.common.white,
  },
  thumb: {
    color: theme.palette.secondary.main,
  },
}));

function ThemeSwitch() {
  const classes = useThemeSwitchStyles();
  const theme = useTheme();

  function handleChange(event) {
    if (event.target.checked) {
      theme.useLightTheme();
    } else {
      theme.useDarkTheme();
    }
  }

  return <Switch checked={theme.isLightThemeOn} onChange={handleChange} />;
}

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 0),
  },
}));

export default function Header({ title, Icon }) {
  const classes = useHeaderStyles();

  return (
    <div className={classes.root}>
      <Logo title={title} Icon={Icon} />

      <Box display="flex" justifyContent="center" alignItems="center">
        <ProfileLink />

        <LogoutButton />

        <LangPicker />

        <ThemeSwitch />
      </Box>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
