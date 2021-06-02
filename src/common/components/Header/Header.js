import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import { debounce } from "lodash";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  Switch,
  MenuItem,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import useAuth from "common/hooks/useAuth";
import useAppTheme from "common/hooks/useAppTheme";
import { useLocalizationContext } from "common/hooks/useLocalization";

const useCommonStyles = makeStyles((theme) => ({
  icon: {
    fill: theme.palette.primary.contrastText,
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

      <Avatar
        className={commonClasses.icon}
        alt="avatar"
        src={auth.user.avatar}
      />
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
  switchBase: {
    color: theme.palette.secondary.main,
    "&$checked + $track": {
      backgroundColor: theme.palette.background.default,
      opacity: 0.7,
    },
  },
  track: {
    backgroundColor: theme.palette.background.default,
    opacity: 0.7,
  },
  checked: {},
}));

function ThemeSwitch() {
  const classes = useThemeSwitchStyles();
  const theme = useAppTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = React.useCallback(
    debounce((checked) => {
      if (checked) {
        theme.useLightTheme();
      } else {
        theme.useDarkTheme();
      }
    }, 500),
    [theme],
  );

  return (
    <Switch
      classes={{
        switchBase: classes.switchBase,
        track: classes.track,
        checked: classes.checked,
      }}
      checked={theme.isLightThemeOn}
      onChange={(e) => handleChange(e.target.checked)}
    />
  );
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
