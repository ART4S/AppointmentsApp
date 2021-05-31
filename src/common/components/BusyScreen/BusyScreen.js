import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import Progress from "../Progress/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  screen: {
    backgroundColor: theme.palette.action.disabledBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    zIndex: 0,
  },
}));

export default function BusyScreen({ isBusy, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isBusy && (
        <div className={classes.screen}>
          <Progress />
        </div>
      )}
      <div className={classes.content}>{children}</div>
    </div>
  );
}

BusyScreen.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
